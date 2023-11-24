import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const AddNewPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="content-container"></div>
      </IonContent>
    </IonPage>
  );
};

export { AddNewPage };
