import { IonButton, IonItem, IonLabel, IonList, IonRow, IonSkeletonText } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { IFloor } from "../../../types";
import ApiService from "../../../api/ApiService";
import { UIStore } from "../../../pullstate";

const FloorsStatuses: React.FC = () => {
  const { isDeveloper } = UIStore.useState((state) => state);
  const [floorsNumbers, floorsNumbersSet] = useState(0);
  const [floorsStatuses, floorsStatusesSet] = useState<IFloor[]>([]);
  const [floorsStatusesLoading, floorsStatusesLoadingSet] = useState(true);
  const [floorsStatusesError, floorsStatusesErrorSet] = useState(false);

  useEffect(() => {
    const getFloorsNumbers = async () => {
      try {
        const response = await ApiService.getAmountOfFloors();
        if (isDeveloper) {
          alert(JSON.stringify(response, undefined, 2));
        }
        floorsNumbersSet(response.data.floorAmount);
        return response.data.floorAmount;
      } catch (error) {
        if (isDeveloper) {
          alert(JSON.stringify(error, undefined, 2));
        }
        return 0;
      }
    };
    getFloorsNumbers();
  }, []);

  useEffect(() => {
    const getFloorsStatuses = async (numbers: number) => {
      try {
        for (let index = 1; index <= numbers; index++) {
          const response = await ApiService.getFloorRecipe(index);
          if (isDeveloper) {
            alert(JSON.stringify(response, undefined, 2));
          }
          floorsStatusesSet((prev) => [...prev, response.data]);
        }
        floorsStatusesLoadingSet(false);
      } catch (error) {
        if (isDeveloper) {
          alert(JSON.stringify(error, undefined, 2));
        }
        floorsStatusesErrorSet(true);
        floorsStatusesLoadingSet(false);
      }
    };
    if (floorsNumbers > 0) {
      getFloorsStatuses(floorsNumbers);
    }
  }, [floorsNumbers]);

  if (floorsStatusesError) {
    return <div style={{ padding: "15px" }}>Error while loading data...</div>;
  }

  if (floorsStatusesLoading) {
    return (
      <div className="content-container">
        <IonList>
          {[0, 1, 2, 3].map((item, indx) => {
            return (
              <IonItem key={indx}>
                <IonLabel>
                  <IonSkeletonText
                    animated={true}
                    style={{
                      paddingTop: 5,
                      paddingBottom: 5,
                      marginTop: 5,
                      marginBottom: 5,
                      width: "100%",
                      height: 30,
                    }}
                  ></IonSkeletonText>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </div>
    );
  }

  if (!floorsStatusesLoading && !floorsStatusesError) {
    return (
      <div className="content-container" style={{ padding: "15px" }}>
        {floorsStatuses.map((floorItem: IFloor) => {
          let floorStatus = "DISABLED";
          if (floorItem.enable !== "0") {
            if (floorItem.mode == "0") floorStatus = "SEEDING";
            if (floorItem.mode == "1") floorStatus = "GROWING";
            if (floorItem.mode == "2") floorStatus = "HARVESTING";
          }
          return (
            <IonRow key={floorItem.floor}>
              <IonButton
                //   onClick={() => navigation.push("/grow/floors", "forward", "push")}
                style={{ width: "100%", marginBottom: 10 }}
                expand="full"
                size="default"
              >
                {`F${floorItem.floor}: ${floorStatus}`}
              </IonButton>
            </IonRow>
          );
        })}
      </div>
    );
  }

  return <div>Error while loading data...</div>;
};

export { FloorsStatuses };
