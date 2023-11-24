import { IonContent, IonPage } from "@ionic/react";
import CustomNavbar from "../../components/CustomNavbar";
import { Settings } from "../../components/Settings";
import { UpdateModal } from "../../components/Settings/UpdateModal";
import { UIStore } from "../../pullstate";

const SettingsPage: React.FC = () => {
  const { mercuryVersion } = UIStore.useState((s) => s)
  return (
    <IonPage>
      <IonContent fullscreen>
        <CustomNavbar backUrl="/app" size="small" title="Settings" altTitle={mercuryVersion} />
        <Settings />
        <UpdateModal />
      </IonContent>
    </IonPage>
  );
};

export { SettingsPage };
