import { InputCustomEvent, IonAccordion, IonButton, IonDatetime, IonDatetimeButton, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonModal } from "@ionic/react";
import { format, parseISO } from "date-fns";
import { IFloorRecipe, ILocalFloor, modalIds, modeTypes, presetRecipes } from "../../types";
import { checkMode } from "../../helpers/checkMode";
import { StartFloorModal } from "./StartFloorModal";
import { useEffect, useState } from "react";
import { StopFloorModal } from "./StopFloorModal";
import { TurnOffTheFloorModal } from "./TurnOffTheFloorModal";
import { AddDaysModal } from "./AddDaysModal";
import { parseDateFromServer } from "../../helpers/parseDateFromServer";
import { PresetModal } from "./PresetModal";
import { useTranslation } from "react-i18next";

interface IAccordionItem {
  floor: IFloorRecipe;
  localFloors: ILocalFloor[];
  setUpdateHandler: any;
}

/**
 * Adds a zero at the beginning if the length of the string is less than or equal to 1
 */
const AccordionItem = ({ setUpdateHandler, floor, localFloors }: IAccordionItem) => {
  const { t } = useTranslation();
  let isEnable = floor.enable == 1 ? true : false;

  let currentAccordionClass = isEnable ? "floors__accordion active" : "floors__accordion";

  const [currentLocalFloor, setCurrentLocalFloor] = useState<ILocalFloor | null | undefined>(null);
  const [selectedPreset, selectedPresetSet] = useState<null | undefined | string>(null);
  const [currentTimeStamp, setCurrentTimeStamp] = useState(Date.now());
  // TODO: unify date string
  const [lightsOnAt, setLightsOnAt] = useState("2022-12-08T08:00:00");
  // TODO: unify date string
  const [lightsOffAt, setLightsOffAt] = useState("2022-12-08T23:59:00");
  const [waterDurationSec, setWaterDurationSec] = useState(floor.enable === 1 ? `${floor.wateringDuration}` : "10");
  const [wateringMinuteStart, setWateringMinuteStart] = useState(floor.enable === 1 ? `${floor.wateringMinute}` : "60");
  const [seedingInDays, setSeedingInDays] = useState(floor.enable === 1 ? `${floor.seedingDuration}` : "3");
  const [totalDurationInDays, setTotalDurationInDays] = useState(floor.enable === 1 ? `${floor.totalDuration}` : "10");

  let modeName = checkMode({
    floorNumber: floor.floor,
    mode: floor.mode,
    enable: floor.enable,
    currentLocalFloor,
    currentTimeStamp,
    creationTimestampServer: floor.creationTimestamp,
    totalduration: floor.totalDuration,
  });

  const selectedPresetSetHandler = (name: string) => {
    selectedPresetSet(name);
  };

  const lightOnAtHander = (e: any) => {
    const timeValue = `${e.target.value}`;
    const formattedHourse = format(parseISO(timeValue), "HH");
    const formattedMinutes = format(parseISO(timeValue), "mm");
    // TODO: unify date string
    setLightsOnAt(`2022-12-08T${formattedHourse}:${formattedMinutes}:00`);
  };

  const lightOffAtHander = (e: any) => {
    const timeValue = `${e.target.value}`;
    const formattedHourse = format(parseISO(timeValue), "HH");
    const formattedMinutes = format(parseISO(timeValue), "mm");
    // TODO: unify date string
    setLightsOffAt(`2022-12-08T${formattedHourse}:${formattedMinutes}:00`);
  };

  useEffect(() => {
    // FIXME: Disable setTotalDurationInDays here  
    if (floor.enable == 0) {
      setTotalDurationInDays("10");
    }

    if (floor.enable == 1) {
      const lampOnHourParse = parseDateFromServer(floor.lampOnHour);
      const lightOnMinuteParse = parseDateFromServer(floor.lampOnMinute);

      const lampOffHourParse = parseDateFromServer(floor.lampOffHour);
      const lightOffMinuteParse = parseDateFromServer(floor.lampOffMinute);
      // TODO: unify date string
      setLightsOnAt(`2022-12-08T${lampOnHourParse}:${lightOnMinuteParse}:00`);
      setLightsOffAt(`2022-12-08T${lampOffHourParse}:${lightOffMinuteParse}:00`);
    }
  }, [floor]);

  // Пробросили все локальные этажи и находим текущий этаж
  useEffect(() => {
    const matchFloor = localFloors.find((lFloor) => lFloor.floor == floor.floor);
    setCurrentLocalFloor(matchFloor);

    // FIXME: Add i18n for modeTypes
    if (currentLocalFloor ) {
      if(floor.creationTimestamp) {
        var targetDate = floor.creationTimestamp;
        var curDate = currentTimeStamp; 
        var result = Math.round((curDate/1000 - targetDate) / 86400);
        setTotalDurationInDays(result + " / " + `${floor.totalDuration + currentLocalFloor.addDays}`);
      }
    }
  }, [localFloors, modeName, currentLocalFloor]);

  useEffect(() => {
    if (selectedPreset) {
      const matchRecipe = presetRecipes.find((recipe) => recipe.name === selectedPreset);
      if (matchRecipe) {
        const lampOnHourParse = parseDateFromServer(matchRecipe.lampOnHour);
        const lightOnMinuteParse = parseDateFromServer(matchRecipe.lampOnMinute);

        const lampOffHourParse = parseDateFromServer(matchRecipe.lampOffHour);
        const lightOffMinuteParse = parseDateFromServer(matchRecipe.lampOffMinute);

        setWaterDurationSec(`${matchRecipe.wateringDuration}`);
        setWateringMinuteStart(`${matchRecipe.wateringMinute}`);
        setSeedingInDays(`${matchRecipe.seedingDuration}`);
        setTotalDurationInDays(`${matchRecipe.totalDuration}`);

        setLightsOnAt(`2022-12-08T${lampOnHourParse}:${lightOnMinuteParse}:00`);
        setLightsOffAt(`2022-12-08T${lampOffHourParse}:${lightOffMinuteParse}:00`);
      }
    }
  }, [selectedPreset]);

  return (
    <IonAccordion key={floor.floor} className={currentAccordionClass} value={`level${floor.floor}`}>
      <IonItem slot="header">
        {/* TODO: Сделать циклом */}
        {floor.floor == 4 ? (
          <IonLabel className="floors__accordion-item-numbers">
            <div className="floors__accordion-item-num active"></div>
            <div className="floors__accordion-item-num"></div>
            <div className="floors__accordion-item-num"></div>
            <div className="floors__accordion-item-num"></div>
          </IonLabel>
        ) : floor.floor == 3 ? (
          <IonLabel className="floors__accordion-item-numbers">
            <div className="floors__accordion-item-num"></div>
            <div className="floors__accordion-item-num active"></div>
            <div className="floors__accordion-item-num"></div>
            <div className="floors__accordion-item-num"></div>
          </IonLabel>
        ) : floor.floor == 2 ? (
          <IonLabel className="floors__accordion-item-numbers">
            <div className="floors__accordion-item-num"></div>
            <div className="floors__accordion-item-num"></div>
            <div className="floors__accordion-item-num active"></div>
            <div className="floors__accordion-item-num"></div>
          </IonLabel>
        ) : floor.floor == 1 ? (
          <IonLabel className="floors__accordion-item-numbers">
            <div className="floors__accordion-item-num"></div>
            <div className="floors__accordion-item-num"></div>
            <div className="floors__accordion-item-num"></div>
            <div className="floors__accordion-item-num active"></div>
          </IonLabel>
        ) : null}
        <IonLabel className="floors__accordion-item-title">
          {t("homePage.flootItem.levelName")} {floor.floor}
        </IonLabel>
        <IonLabel className="floors__accordion-item-subtitle" slot="end"> 
          {t(`homePage.flootItem.status.${modeName}`)}
        </IonLabel>
      </IonItem>
      <div slot="content">
        <IonList lines="full" className="statuses__list">
          <IonListHeader className="floors__list-header">
            <div className="floors__list-header-item">
              <p className="floors__list-header-title">{t("homePage.flootItem.recipeTitle")}</p>
            </div>
          </IonListHeader>
          <IonItem className="floors__inner-item">
            <IonLabel>{t("homePage.flootItem.lightOnAt")}</IonLabel>
            <IonDatetimeButton disabled={isEnable} datetime={`${modalIds.lightOnAt}-${floor.floor}`}></IonDatetimeButton>
          </IonItem>
          <IonItem className="floors__inner-item">
            <IonLabel>{t("homePage.flootItem.lightOffAt")}</IonLabel>
            <IonDatetimeButton disabled={isEnable} datetime={`${modalIds.lightOffAt}-${floor.floor}`}></IonDatetimeButton>
          </IonItem>
          <IonItem className="floors__inner-item">
            <IonLabel>{t("homePage.flootItem.wateringInterval")}</IonLabel>
            <IonInput
              min="10"
              max="100"
              inputMode="numeric"
              onIonChange={(e: InputCustomEvent) => setWateringMinuteStart(`${e.target.value}`)}
              readonly={isEnable}
              slot="end"
              placeholder="00"
              value={wateringMinuteStart}
            />
          </IonItem>
          <IonItem className="floors__inner-item">
            <IonLabel>{t("homePage.flootItem.wateringDuration")}</IonLabel>
            <IonInput
              min="10"
              max="100"
              inputMode="numeric"
              onIonChange={(e: InputCustomEvent) => setWaterDurationSec(`${e.target.value}`)}
              readonly={isEnable}
              slot="end"
              placeholder="00"
              value={waterDurationSec}
            />
          </IonItem>
          <IonItem className="floors__inner-item">
            <IonLabel>{t("homePage.flootItem.seedingInDays")}</IonLabel>
            <IonInput
              min="10"
              max="100"
              inputMode="numeric"
              onIonChange={(e: InputCustomEvent) => setSeedingInDays(`${e.target.value}`)}
              readonly={isEnable}
              slot="end"
              placeholder="00"
              value={seedingInDays}
            />
          </IonItem>
          <IonItem className="floors__inner-item">
            <IonLabel>{t("homePage.flootItem.totalDurationInDays")}</IonLabel>
            <IonInput
              min="10"
              max="100"
              inputMode="numeric"
              onIonChange={(e: InputCustomEvent) => setTotalDurationInDays(`${e.target.value}`)}
              readonly={isEnable}
              slot="end"
              placeholder="00"
              value={totalDurationInDays}
            />
          </IonItem>
        </IonList>
        <>
          <div className="ion-padding floors__actions">
            {floor.enable >= 1 ? null : (
              <>
                <IonButton className="floors__actions-item" id={`${modalIds.presets}-${floor.floor}`} expand="block">
                  {t("homePage.flootItem.presetsButton")}
                </IonButton>
                <IonButton className="floors__actions-item" id={`${modalIds.startTheFloor}-${floor.floor}`} expand="block">
                  {t("homePage.flootItem.startButton")}
                </IonButton>
              </>
            )}
            {floor.enable == 1 && modeName !== modeTypes.HARVESTING ? (
              <IonButton className="floors__actions-item" color="secondary" id={`${modalIds.stopTheFloor}-${floor.floor}`} expand="block">
                {t("homePage.flootItem.stopButton")}
              </IonButton>
            ) : null}
            {modeName == modeTypes.HARVESTING ? (
              <IonButton className="floors__actions-item" id={`${modalIds.turnOffTheFloor}-${floor.floor}`} expand="block">
                {t("homePage.flootItem.turnOffButton")}
              </IonButton>
            ) : null}
            {modeName == modeTypes.HARVESTING ? (
              <IonButton className="floors__actions-item" color="secondary" id={`${modalIds.addDays}-${floor.floor}`} expand="block">
                {t("homePage.flootItem.addDaysButton")}
              </IonButton>
            ) : null}
          </div>
          {floor.enable >= 1 ? null : (
            <>
              <StartFloorModal
                modalId={`${modalIds.startTheFloor}-${floor.floor}`}
                lightsOnAt={lightsOnAt}
                lightsOffAt={lightsOffAt}
                waterDurationSec={waterDurationSec}
                wateringMinuteStart={wateringMinuteStart}
                seedingInDays={seedingInDays}
                totalDurationInDays={totalDurationInDays}
                floorNumber={floor.floor}
                setUpdateHandler={setUpdateHandler}
              />
              <PresetModal selectedPresetSetHandler={selectedPresetSetHandler} floorNumber={floor.floor} modalId={`${modalIds.presets}-${floor.floor}`} />
            </>
          )}
          {floor.enable == 1 && modeName !== modeTypes.HARVESTING ? (
            <StopFloorModal setUpdateHandler={setUpdateHandler} floorNumber={floor.floor} modalId={`${modalIds.stopTheFloor}-${floor.floor}`} />
          ) : null}
          {modeName == modeTypes.HARVESTING ? (
            <TurnOffTheFloorModal setUpdateHandler={setUpdateHandler} floorNumber={floor.floor} modalId={`${modalIds.turnOffTheFloor}-${floor.floor}`} />
          ) : null}
          {modeName == modeTypes.HARVESTING ? <AddDaysModal setUpdateHandler={setUpdateHandler} floorNumber={floor.floor} modalId={`${modalIds.addDays}-${floor.floor}`} /> : null}
          <IonModal keepContentsMounted={true}>
            <IonDatetime
              className="custom-time-picker"
              locale="ru-RU"
              value={lightsOnAt}
              onIonChange={(e) => lightOnAtHander(e)}
              showDefaultButtons
              doneText={`${t("homePage.flootItem.setTimeConfirmText")}`}
              cancelText={`${t("homePage.flootItem.setTimeCancelText")}`}
              presentation="time"
              id={`${modalIds.lightOnAt}-${floor.floor}`}
            ></IonDatetime>
          </IonModal>
          <IonModal keepContentsMounted={true}>
            <IonDatetime
              className="custom-time-picker"
              locale="ru-RU"
              value={lightsOffAt}
              onIonChange={(e) => lightOffAtHander(e)}
              showDefaultButtons
              doneText={`${t("homePage.flootItem.setTimeConfirmText")}`}
              cancelText={`${t("homePage.flootItem.setTimeCancelText")}`}
              presentation="time"
              id={`${modalIds.lightOffAt}-${floor.floor}`}
            ></IonDatetime>
          </IonModal>
        </>
      </div>
    </IonAccordion>
  );
};

export { AccordionItem };
