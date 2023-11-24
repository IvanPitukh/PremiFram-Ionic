import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Grow } from "../../../components/Grow";

const GrowPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Grow</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Grow />
      </IonContent>
    </IonPage>
  );
};

export { GrowPage };
