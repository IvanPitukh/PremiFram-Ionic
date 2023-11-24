import { IonContent, IonImg, IonPage, IonRefresher, IonRefresherContent, IonSkeletonText, RefresherEventDetail } from '@ionic/react'
import Home from '../../components/Home'
import CustomNavbar from '../../components/CustomNavbar'
import { StopWateringModal } from '../../components/Home/StopWateringModal'
import { StopAllFloorsModal } from '../../components/Home/StopAllFloorsModal'
import { useEffect, useState } from 'react'
import ApiService from '../../api/ApiService'
import { IDosing, IFloorRecipe, ILocalFloor } from '../../types'
import { getWaterLevelHeight } from '../../helpers/getWaterLevelHeight'
import { get, remove, set } from '../../data/IonicStorage'
import { getFinishDate } from '../../helpers/getFinishDate'
import { UIStore } from '../../pullstate'

const Statuses = () => {
  const { isDeveloper } = UIStore.useState((state) => state)
  const [dosing, setDosing] = useState<IDosing>()
  const { pullstateUpd } = UIStore.useState((s) => s)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await Promise.all([ApiService.getDosingSensorData(), ApiService.getVersionHardwareAndSoftware()])
        if (isDeveloper) {
          alert(JSON.stringify(data, undefined, 2))
        }
        const ph = data[0].data.ph == 42405 ? 0 : (data[0].data.ph) / 10;
        const tds = data[0].data.tds == 42405 ? 0 : data[0].data.tds;
        const temperature = data[0].data.temperature == 42405 ? 0 : data[0].data.temperature;
        const depth = data[0].data.depth == 42405 ? 0 : data[0].data.depth;
        const h_off = data[1].data.offset;
        const h_tank = data[1].data.tankHeight;
        const h_min = data[1].data.minimumWaterLevel;
        const mercuryVersionResponse = data[1].data.mercuryVersion;

        UIStore.update((state) => {
          state.mercuryVersion = mercuryVersionResponse
        })

        const realWaterHeigth = getWaterLevelHeight({ depth, h_off, h_tank, h_min })
        const dosingData = {
          ph,
          tds,
          temperature,
          depth: Number(realWaterHeigth.toFixed(0)),
        }
        setDosing(dosingData)
      } catch (error) {
        if (isDeveloper) {
          alert(JSON.stringify(error, undefined, 2))
        }
        return null
      }
    }
    getData()
  }, [pullstateUpd])

  if (!dosing) {
    return (
      <div className="statuses">
        <div className="statuses__item">
          <IonImg alt="icon" src={'./assets/icon/icon-thermometer-white.svg'} className="statuses__icon" />
          <IonSkeletonText style={{ width: 40 }} animated={true}>
            <div className="statuses__text">...</div>
          </IonSkeletonText>
        </div>

        <div className="statuses__item">
          <IonImg alt="icon" src={'./assets/icon/icon-water-volume-white.svg'} className="statuses__icon" />
          <IonSkeletonText style={{ width: 40 }} animated={true}>
            <div className="statuses__text">...</div>
          </IonSkeletonText>
        </div>

        <div className="statuses__item">
          <IonImg alt="icon" src={'./assets/icon/icon-ph-white.svg'} className="statuses__icon" />
          <IonSkeletonText style={{ width: 40 }} animated={true}>
            <div className="statuses__text">...</div>
          </IonSkeletonText>
        </div>

        <div className="statuses__item">
          <IonImg alt="icon" src={'./assets/icon/icon-tds-white.svg'} className="statuses__icon" />
          <IonSkeletonText style={{ width: 40 }} animated={true}>
            <div className="statuses__text">...</div>
          </IonSkeletonText>
        </div>
      </div>
    )
  }

  return (
    <div className="statuses">
      <div className="statuses__item">
        <IonImg alt="icon" src={'./assets/icon/icon-thermometer-white.svg'} className="statuses__icon" />
        <div className="statuses__text">
          {dosing.temperature}C<sup>o</sup>
        </div>
      </div>

      <div className="statuses__item">
        <IonImg alt="icon" src={'./assets/icon/icon-water-volume-white.svg'} className="statuses__icon" />
        <div className="statuses__text">{dosing.depth}%</div>
      </div>

      <div className="statuses__item">
        <IonImg alt="icon" src={'./assets/icon/icon-ph-white.svg'} className="statuses__icon" />
        <div className="statuses__text">{dosing.ph}</div>
      </div>

      <div className="statuses__item">
        <IonImg alt="icon" src={'./assets/icon/icon-tds-white.svg'} className="statuses__icon" />
        <div className="statuses__text">{dosing.tds}</div>
      </div>
    </div>
  )
}

const Loader = () => {
  const { isDeveloper } = UIStore.useState((state) => state)
  return (
    <div className="content-container offset-content floors">
      <div className="floors__skeleton">
        <IonSkeletonText style={{ width: '100%' }} animated={true}></IonSkeletonText>
      </div>
      <div className="floors__skeleton">
        <IonSkeletonText style={{ width: '100%' }} animated={true}></IonSkeletonText>
      </div>
      <div className="floors__skeleton">
        <IonSkeletonText style={{ width: '100%' }} animated={true}></IonSkeletonText>
      </div>
      <div className="floors__skeleton">
        <IonSkeletonText style={{ width: '100%' }} animated={true}></IonSkeletonText>
      </div>
    </div>
  )
}

const HomePage: React.FC = () => {
  const { isDeveloper } = UIStore.useState((state) => state)
  const [floorsNumber, setFloorsNumber] = useState(0)
  const [floors, setFloors] = useState<IFloorRecipe[]>([])
  const [localFloors, setLocalFloors] = useState<ILocalFloor[]>([])
  const [update, setUpdate] = useState(false)
  const setUpdateHandler = () => setUpdate((prev) => !prev)

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    setUpdate((prev) => !prev)
    UIStore.update((state) => {
      state.pullstateUpd = Date.now()
    })
    event.detail.complete()
  }
  function delay(ms:number){  
    return new Promise(resolve => setTimeout(resolve, ms))
   }
  useEffect(() => {
    
 
    setLocalFloors((prev) => [])
    if (floorsNumber > 0) {
      const floorsNumberArray = Array.from({ length: floorsNumber })
        .map((_, indx) => indx + 1)
        .reverse()

      const getData = async () => {
        let response = [];
        try { 
          const randomDelay = () => new Promise(resolve => setTimeout(resolve, 50));
          await randomDelay();
          await randomDelay();
          for(const item of floorsNumberArray) {
            let result = await ApiService.getFloorRecipe(item);
            response.push(result);
            await randomDelay();
          }
          
          if (isDeveloper) {
            alert(JSON.stringify(response, undefined, 2))
          }
        } catch (error) {
          if (isDeveloper) {
            alert(JSON.stringify(error, undefined, 2))
          }
          response = []
        }
        if (response) {
          const parseData: any[] | ((prevState: IFloorRecipe[]) => IFloorRecipe[]) = []

          for await (const item of response) {
            const data = item.data
            const floorNumber = data.floor
            const enable = data.enable
            const mode = data.mode
            const totalDuration = data.totalDuration
            const creationTimestamp = Date.now()
            const totalEndDate = getFinishDate(item.data.creationTimestamp, totalDuration, 0)
            const creationTimestampServer = data.creationTimestamp
            const localFloor = await get(`floor_${floorNumber}`)

            // Если нету локольного этажа и enable == 1
            if (!localFloor && enable == 1) {
              const prepareLocalFloorData = {
                floor: floorNumber,
                totalDuration: totalDuration,
                creationTimestamp: creationTimestamp,
                addDays: 0,
                enable,
                mode,
                totalEndDate,
                creationTimestampServer,
              }
              const matchFloor = localFloors.find((localFloor) => localFloor.floor == floorNumber)

              // Обновляем
              if (matchFloor) {
                setLocalFloors((prev) => [...prev, prepareLocalFloorData])
                await set(`floor_${floorNumber}`, prepareLocalFloorData)
              }

              // Создаем локальный этаж
              await set(`floor_${floorNumber}`, prepareLocalFloorData)
            }

            // Если enable == 1 && Если есть этаж, обновляем: mode
            if (localFloor && data.enable == 1) {
              const prepareLocalFloorData = {
                ...localFloor,
                mode: data.mode,
                updatedAt: Date.now(),
              }
              setLocalFloors((prev) => [...prev, prepareLocalFloorData])
              await set(`floor_${floorNumber}`, prepareLocalFloorData)
            }

            // Если enable == 0, Удаляем этаж
            if (enable == 0) {
              await remove(`floor_${floorNumber}`)
            }

            parseData.push(data)
          }

          setFloors(parseData)
          return parseData
        }
      }

      getData()
    }
  }, [floorsNumber, update])

  useEffect(() => {
    const getFloorsQuery = async () => {
      try {
        const response = await ApiService.getAmountOfFloors()
        if (isDeveloper) {
          alert(JSON.stringify(response, undefined, 2))
        }
        setFloorsNumber(response.data.floorAmount)
      } catch (error) {
        if (isDeveloper) {
          alert(JSON.stringify(error, undefined, 2))
        }
      } finally {
      }
    }
    getFloorsQuery()
  }, [])

  return (
    <IonPage>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <CustomNavbar statuses={<Statuses />} title="Home" />
        {floors.length <= 0 ? <Loader /> : <Home setUpdateHandler={setUpdateHandler} floors={floors} localFloors={localFloors} />}
        {floors.length <= 0 ? null : (
          <>
            <StopWateringModal />
            <StopAllFloorsModal setUpdateHandler={setUpdateHandler} />
          </>
        )}
      </IonContent>
    </IonPage>
  )
}

export { HomePage }
