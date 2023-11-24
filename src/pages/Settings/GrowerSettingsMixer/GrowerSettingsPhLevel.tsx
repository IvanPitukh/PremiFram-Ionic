import React, { useRef } from "react";
import { IonButton, IonModal, useIonToast } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { getValuesWithStep } from "../../../helpers/getValuesWithStep";
import { UIStore } from "../../../pullstate";
import { i18Languages } from "../../../types";

const defaultPhLevel = 6;

interface IGrowerSettingsMixer {
  modalId: string;
}

const GrowerSettingsPhLevel: React.FC<IGrowerSettingsMixer> = ({ modalId }: IGrowerSettingsMixer) => {
  const { t, i18n } = useTranslation();
  const { growerSettingsMixerPh } = UIStore.useState((state) => state);
  const modal = useRef<HTMLIonModalElement>(null);
  const [presentToast] = useIonToast();

  const onChangeHandler = (value: number) => () => {
    if (growerSettingsMixerPh === value) {
      UIStore.update((st) => {
        st.growerSettingsMixerPh = defaultPhLevel;
      });
    } else {
      UIStore.update((st) => {
        st.growerSettingsMixerPh = value;
      });
    }
  };

  const onConfirm = async () => {
    modal.current?.dismiss(undefined, "confirm");
    await presentToast({
      message: `${growerSettingsMixerPh}`,
      duration: 2000,
      cssClass: "custom-toast",
    });
  };

  const onCancel = async () => {
    modal.current?.dismiss(undefined, "confirm");
  };

  return (
    <IonModal className="custom-modal" ref={modal} trigger={modalId}>
      <div className="custom-modal__container">
        <p className="custom-modal__title">{t("mixerSettingsPage.phLevelModalTitle")}</p>
        <p className="custom-modal__subtitle">
          {t("mixerSettingsPage.phLevelModalSubtitle")} {growerSettingsMixerPh}
        </p>
        <div className="custom-modal__recipes">
          {getValuesWithStep(3, 7, 0.1).map((item) => {
            return (
              <div onClick={onChangeHandler(item)} key={item} className={growerSettingsMixerPh === item ? "custom-modal__recipes-item active" : "custom-modal__recipes-item"}>
                {item}
              </div>
            );
          })}
        </div>
        <IonButton onClick={onConfirm} type="button" expand="block">
          {t("mixerSettingsPage.mixerModalConfirm")}
        </IonButton>
        <IonButton color="light" expand="block" onClick={onCancel}>
          {t("mixerSettingsPage.mixerModalCancel")}
        </IonButton>
      </div>
    </IonModal>
  );
};

export { GrowerSettingsPhLevel };
