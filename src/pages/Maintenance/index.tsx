import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const MaintenancePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Maintenance</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Maintenance</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="content-container"></div>
      </IonContent>
    </IonPage>
  );
};

export { MaintenancePage };
