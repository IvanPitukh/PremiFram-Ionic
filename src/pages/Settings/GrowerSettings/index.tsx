import { IonButton, IonContent, IonIcon, IonPage, IonRippleEffect, useIonRouter } from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";
import React from "react";
import { useTranslation } from "react-i18next";
import CustomNavbar from "../../../components/CustomNavbar";

const GrowerSettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <CustomNavbar backUrl="/app/settings" size="small" title="Grower settings" />
        <div className="content-container offset-content settings">
          <div className="settings__list-with-details">
            <div className="settings__list">
              {/* FIXME: Delete this line */}
              {/* <button onClick={() => navigation.push("/app/settings/set-time", "forward", "push")} className="ion-activatable ripple-parent settings__list-item">
                <IonIcon className="settings__list-item-icon" icon={`./assets/icon/icon-settings-black.svg`} />
                <p className="settings__list-item-title">General</p>
                <IonIcon className="settings__list-item-icon settings__list-item-icon_forward" icon={chevronForwardOutline} />
                <IonRippleEffect />
              </button> */}
              <button onClick={() => navigation.push("/app/settings/grower/mixer", "forward", "push")} className="ion-activatable ripple-parent settings__list-item">
                <IonIcon className="settings__list-item-icon" icon={`./assets/icon/icon-mixer-black.svg`} />
                <p className="settings__list-item-title">{t("growerSettingsPage.mixerSettingsLink")}</p>
                <IonIcon className="settings__list-item-icon settings__list-item-icon_forward" icon={chevronForwardOutline} />
                <IonRippleEffect />
              </button>
              <IonButton color="secondary" onClick={() => navigation.push("/app/settings", "back", "push")}>
                {t("growerSettingsPage.backButton")}
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export { GrowerSettingsPage };
