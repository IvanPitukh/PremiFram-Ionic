import React, { useState, useRef } from "react";
import { IonButton, IonModal } from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { modalIds } from "../../types";
import { useTranslation } from "react-i18next";

const StopWateringModal: React.FC = () => {
  const { t } = useTranslation();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [message, setMessage] = useState("This modal example uses triggers to automatically open a modal when the button is clicked.");

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }
  return (
    <IonModal className="custom-modal" ref={modal} trigger={modalIds.stopWatering} onWillDismiss={(ev) => onWillDismiss(ev)}>
      <div className="custom-modal__container">
        <p className="custom-modal__title">{t("homePage.stopWateringModal.title")}</p>
        <p className="custom-modal__subtitle">{t("homePage.stopWateringModal.subTitle")}</p>
        <p className="custom-modal__subtitle">
          <b>{t("homePage.stopWateringModal.description")}</b>
        </p>
        <IonButton onClick={confirm} expand="block">
          {t("homePage.stopWateringModal.confirmButton")}
        </IonButton>
        <IonButton color="light" expand="block" onClick={() => modal.current?.dismiss()}>
          {t("homePage.stopWateringModal.cancelButton")}
        </IonButton>
      </div>
    </IonModal>
  );
};

export { StopWateringModal };
