import React, { useState, useRef, useEffect } from "react";
import { IonModal, useIonToast } from "@ionic/react";
import { modalIds } from "../../../types";
import { Loader } from "../../../shared/Loader";
import ApiService from "../../../api/ApiService";
import { UIStore } from "../../../pullstate";
import { useTranslation } from "react-i18next";

const SetTimeModal: React.FC = () => {
  const { t } = useTranslation();
  const { isDeveloper } = UIStore.useState((state) => state);
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [presentToast] = useIonToast();
  const [canDismiss, setCanDismiss] = useState(false);

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  const setTimeHandler = async () => {
    const date = new Date();
    const timeObject = {
      year: date.getFullYear(),
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      month: date.getMonth(),
      second: date.getSeconds(),
    };
    try {
      setCanDismiss(false);
      const response = await ApiService.setClock({
        ...timeObject,
      });
      if (isDeveloper) {
        alert(JSON.stringify(response, undefined, 2));
      }
      presentToast({
        message: t("timePage.toastSuccessServer"),
        duration: 2000,
        cssClass: "custom-toast",
      });
    } catch (error) {
      if (isDeveloper) {
        alert(JSON.stringify(error, undefined, 2));
      }
      await presentToast({
        message: t("timePage.toastErrorServer"),
        duration: 2000,
        cssClass: "custom-toast custom-toast_danger",
      });
    } finally {
      setCanDismiss(true);
      confirm();
    }
  };

  useEffect(() => {
    if (canDismiss) {
      modal.current?.dismiss(input.current?.value, "confirm");
    }
  }, [canDismiss]);

  return (
    <IonModal canDismiss={canDismiss} onDidPresent={setTimeHandler} className="custom-modal" ref={modal} trigger={modalIds.setTimeModal}>
      <div className="custom-modal__container">
        <Loader title={t("timePage.loadingModalTitle")} description={t("timePage.loadingModalDescription")} />
      </div>
    </IonModal>
  );
};

export { SetTimeModal };
