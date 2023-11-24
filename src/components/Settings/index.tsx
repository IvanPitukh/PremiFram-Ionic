import { IonIcon, IonRippleEffect, IonSelect, IonSelectOption, IonText, useIonRouter, useIonToast } from "@ionic/react";
import { bug, chevronForwardOutline, copyOutline, homeOutline, time } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { set, SELECTED_LANGUAGE } from "../../data/IonicStorage";
import timer from "../../hooks/useTimeout";
import { UIStore } from "../../pullstate";

const Settings: React.FC = () => {
  const navigation = useIonRouter();
  const [count, countSet] = useState(0);
  const [presentToast] = useIonToast();
  const { isDeveloper } = UIStore.useState((s) => s);
  const [disabledDevButton, disabledDevButtonSet] = useState(true);
  const { t, i18n } = useTranslation();

  const enableDeveloperMode = async () => {
    countSet((prev) => prev + 1);
    if (count > 15 && !isDeveloper) {
      disabledDevButtonSet(true);
      countSet(0);
      UIStore.update((state) => {
        state.isDeveloper = true;
      });
      return await presentToast({
        message: `You are a developer`,
        duration: 2000,
        cssClass: "custom-toast",
      });
    }
  };

  const disableDeveloperMode = async () => {
    countSet(0);
    UIStore.update((state) => {
      state.isDeveloper = false;
    });
    return await presentToast({
      message: `You are not a developer`,
      duration: 2000,
      cssClass: "custom-toast custom-toast_alert",
    });
  };

  useEffect(() => {
    const foo = async () => {
      await timer(2000);
      disabledDevButtonSet(false);
    };
    if (isDeveloper) {
      foo();
    }
  }, [isDeveloper]);

  return (
    <div className="content-container offset-content settings">
      <div className="settings__list-with-details">
        <div className="settings__list">
          <button onClick={() => navigation.push("/app/settings/grower", "forward", "push")} className="ion-activatable ripple-parent settings__list-item">
            <IonIcon className="settings__list-item-icon" icon={`./assets/icon/icon-floors-black.svg`} />
            <p className="settings__list-item-title">{t("settingsPage.growerSettingsLink")}</p>
            <IonIcon className="settings__list-item-icon settings__list-item-icon_forward" icon={chevronForwardOutline} />
            <IonRippleEffect />
          </button>
          <button onClick={() => navigation.push("/app/settings/set-time", "forward", "push")} className="ion-activatable ripple-parent settings__list-item">
            <IonIcon className="settings__list-item-icon" icon={time} />
            <p className="settings__list-item-title">{t("settingsPage.setTimeLink")}</p>
            <IonIcon className="settings__list-item-icon settings__list-item-icon_forward" icon={chevronForwardOutline} />
            <IonRippleEffect />
          </button>
          <button onClick={() => navigation.push("/app/settings/set-api", "forward", "push")} className="ion-activatable ripple-parent settings__list-item">
            <IonIcon className="settings__list-item-icon" icon={copyOutline} />
            <p className="settings__list-item-title">{t("settingsPage.changeApiLink")}</p>
            <IonIcon className="settings__list-item-icon settings__list-item-icon_forward" icon={chevronForwardOutline} />
            <IonRippleEffect />
          </button>
          <button onClick={() => navigation.push("/", "back", "push")} className="ion-activatable ripple-parent settings__list-item">
            <IonIcon className="settings__list-item-icon" icon={homeOutline} />
            <p className="settings__list-item-title">{t("settingsPage.goToObnoardingPageLink")}</p>
            <IonIcon className="settings__list-item-icon settings__list-item-icon_forward" icon={chevronForwardOutline} />
            <IonRippleEffect />
          </button>
          <button onClick={() => navigation.push("/app/settings/firmware", "forward", "push")} className="ion-activatable ripple-parent settings__list-item">
            <IonIcon className="settings__list-item-icon" icon={`./assets/icon/icon-firmware.svg`} />
            <p className="settings__list-item-title">{t("settingsPage.updateFirmwareLink")}</p>
            <IonIcon className="settings__list-item-icon settings__list-item-icon_forward" icon={chevronForwardOutline} />
            <IonRippleEffect />
          </button>
          <button className="settings__list-item">
            <IonIcon className="settings__list-item-icon" icon={`./assets/icon/icon-language.svg`} />
            <p className="settings__list-item-title">{t("settingsPage.languageButtonTitle")}</p>
            <IonSelect
              onIonChange={async (e) => {
                const val = e.target.value;
                await set(SELECTED_LANGUAGE, `${val}`);
                i18n.changeLanguage(`${val}`);
              }}
              // FIXME: unificate this
              /**
               * en: english,
                 ru: russian,
                 et: estonian,
               */
              placeholder={i18n.language == "en" ? "English" : i18n.language == "et" ? "Estonian" : "Select language"}
              interfaceOptions={{
                header: `${t("settingsPage.languageModalTitle")}`,
              }}
            >
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="et">Eesti</IonSelectOption>
            </IonSelect>
          </button>
          {!isDeveloper ? null : (
            <button disabled={disabledDevButton} onClick={disableDeveloperMode} className="ion-activatable ripple-parent settings__list-item">
              <IonIcon className="settings__list-item-icon" icon={bug} />
              <p className="settings__list-item-title">Disable developer mode</p>
              <IonRippleEffect />
            </button>
          )}
          {isDeveloper ? null : <div onClick={enableDeveloperMode} className="settings__tab"></div>}
        </div>

        {/* <div className="settings__list">
          <button className="ion-activatable ripple-parent settings__list-item">
            <p className="settings__list-item-title">Date</p>
            <span className="settings__list-item-current-time">31 December 2022</span>
            <IonRippleEffect />
          </button>
          <button className="ion-activatable ripple-parent settings__list-item">
            <p className="settings__list-item-title">Time</p>
            <span className="settings__list-item-current-time">19:10:36</span>
            <IonRippleEffect />
          </button>
          <IonButton>Set Date & Time</IonButton>
        </div> */}

        {/* <IonList lines="full" className="settings__list">
          <IonItem button>
            <IonLabel>Set time zone </IonLabel>
            <IonLabel style={{ paddingRight: 10 }} slot="end">
              UTC +2
            </IonLabel>
          </IonItem>
          <IonItem id={modalIds.updateFirmware} button detail={true}>
            <IonLabel>Update firmware</IonLabel>
          </IonItem>
        </IonList> */}
        {/* <IonList lines="full" className="settings__details">
          <IonItem >
            <IonLabel>
              <h6>WIFI: Telia-C24u</h6>
              <p>IP: 1.1.1.1</p>
              <div className="settings__details-footer">
                <p>gateway: 1.1.1.2</p>
                <p>firmware: 1.1</p>
              </div>
            </IonLabel>
          </IonItem>
        </IonList> */}
      </div>
    </div>
  );
};

export { Settings };
