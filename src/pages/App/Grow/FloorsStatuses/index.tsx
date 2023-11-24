import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { FloorsStatuses } from "../../../../components/Grow/FloorsStatuses";

const FloorsStatusesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Floors statuses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <FloorsStatuses />
      </IonContent>
    </IonPage>
  );
};

export { FloorsStatusesPage };
