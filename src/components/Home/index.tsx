import { IonAccordionGroup, IonButton } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { IFloorRecipe, ILocalFloor, modalIds } from "../../types";
import { AccordionItem } from "./AccordionItem";

interface IHome {
  floors: any;
  setUpdateHandler: any;
  localFloors: ILocalFloor[];
}

const Home = ({ floors, setUpdateHandler, localFloors }: IHome) => {
  const { t } = useTranslation();

  return (
    <div className="content-container offset-content floors">
      <IonAccordionGroup className="floors__accordion-group" multiple={true}>
        {floors.map((floor: IFloorRecipe) => {
          return <AccordionItem localFloors={localFloors} setUpdateHandler={setUpdateHandler} key={floor.floor} floor={floor} />;
        })}
      </IonAccordionGroup>
      <div>
        <IonButton style={{ textTransform: "unset", fontWeight: 500 }} color="light" id={modalIds.stopWatering} expand="block">
          {t("homePage.disableWateringButton")}
        </IonButton>
        <IonButton style={{ textTransform: "unset", fontWeight: 500 }} color="light" id={modalIds.stopAllFloorsModal} expand="block">
          {t("homePage.stopAllFloorsButton")}
        </IonButton>
      </div>
    </div>
  );
};

export default Home;
