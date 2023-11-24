import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { helpCircleOutline, home, homeOutline, settings, settingsOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { Redirect, Route } from "react-router";
import { AddNewPage } from "../AddNew";
import { FloorsStatusesPage } from "../App/Grow/FloorsStatuses";
import { HelpPage } from "../Help";
import { HomePage } from "../Home";
import { MaintenancePage } from "../Maintenance";
import { SettingsPage } from "../Settings";
import { GrowerSettingsPage } from "../Settings/GrowerSettings";
import { GrowerSettingsMixerPage } from "../Settings/GrowerSettingsMixer";
import { SetApiPage } from "../Settings/SetApi";
import { SettingsTimePage } from "../Settings/SetTime";
import { UpdateFirmwarePage } from "../Settings/UpdateFirmware";

const Tabs: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/app/home" component={HomePage} />
        <Route path="/app/maintenance" component={MaintenancePage} />
        <Route exact path="/app/add-new" component={AddNewPage} />
        <Route path="/app/grow/floors-statuses" component={FloorsStatusesPage} />
        <Route exact path="/app/settings" component={SettingsPage} />
        <Route exact path="/app/settings/grower" component={GrowerSettingsPage} />
        <Route path="/app/settings/grower/mixer" component={GrowerSettingsMixerPage} />
        <Route path="/app/settings/set-time" component={SettingsTimePage} />
        <Route path="/app/settings/firmware" component={UpdateFirmwarePage} />
        <Route path="/app/settings/set-api" component={SetApiPage} />
        <Route path="/app/help" component={HelpPage} />
        <Route exact path="/app">
          <Redirect to="/app/home" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/app/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>{t("tapbar.home")}</IonLabel>
        </IonTabButton>

        {/* <IonTabButton tab="maintenance" href="/app/add-new">
          <IonIcon icon={addCircleOutline} />
          <IonLabel>ADD NEW</IonLabel>
        </IonTabButton> */}

        <IonTabButton tab="settings" href="/app/settings">
          <IonIcon icon={settingsOutline} />
          <IonLabel>{t("tapbar.settings")}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="grow" href="/app/help">
          <IonIcon icon={helpCircleOutline} />
          <IonLabel>{t("tapbar.help")}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export { Tabs };
