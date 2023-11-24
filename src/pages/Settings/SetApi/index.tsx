import { IonContent, IonPage } from "@ionic/react";
import CustomNavbar from "../../../components/CustomNavbar";
import { SetApi } from "../../../components/Settings/UpdateApi";

const SetApiPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <CustomNavbar backUrl="/app/settings" size="small" title="Set api url" />
        <SetApi />
      </IonContent>
    </IonPage>
  );
};

export { SetApiPage };
