import { IonContent, IonPage } from "@ionic/react";
import CustomNavbar from "../../../components/CustomNavbar";
import { UpdateTime } from "../../../components/Settings/UpdateTime";
import { SetTimeModal } from "./SetTimeModal";

const SettingsTimePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <CustomNavbar backUrl="/app/settings" size="small" title="Set time zone" />
        <UpdateTime />
        <SetTimeModal />
      </IonContent>
    </IonPage>
  );
};

export { SettingsTimePage };
