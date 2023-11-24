import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

const MainPage: React.FC = () => {
  const navigation = useIonRouter();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Main</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Main</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="content-container" style={{ padding: "15px" }}>
          <IonRow>
            <IonButton
              onClick={() => navigation.push("/maintenance", "forward", "push")}
              style={{ width: "100%", marginBottom: 10 }}
              expand="full"
              size="default"
            >
              Maintenance
            </IonButton>
          </IonRow>
          <IonRow>
            <IonButton
              onClick={() => navigation.push("/grow", "forward", "push")}
              style={{ width: "100%", marginBottom: 10 }}
              expand="full"
              size="default"
            >
              Grow
            </IonButton>
          </IonRow>
          <IonRow>
            <IonButton
              onClick={() => navigation.push("/settings", "forward", "push")}
              style={{ width: "100%", marginBottom: 10 }}
              expand="full"
              size="default"
            >
              Settings
            </IonButton>
          </IonRow>
        </div>
      </IonContent>
    </IonPage>
  );
};

export { MainPage };
