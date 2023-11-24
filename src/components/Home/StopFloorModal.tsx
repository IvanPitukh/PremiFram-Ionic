import React, { useEffect, useRef, useState } from "react";
import { IonButton, IonModal, useIonToast } from "@ionic/react";
import ApiService from "../../api/ApiService";
import { remove } from "../../data/IonicStorage";
import { UIStore } from "../../pullstate";
import { useTranslation } from "react-i18next";

interface IStopFloorModal {
  modalId: string;
  floorNumber: number;
  setUpdateHandler: any;
}

const StopFloorModal: React.FC<IStopFloorModal> = (modalProps: IStopFloorModal) => {
  const { t } = useTranslation();
  const { isDeveloper } = UIStore.useState((state) => state);
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [canDismiss, setCanDismiss] = useState(true);
  const [presentToast] = useIonToast();

  const stopFloorHandler = async () => {
    try {
      setCanDismiss(false);
      setLoading(true);
      const response = await ApiService.setFloorRecipe({
        floor: modalProps.floorNumber,
        enable: 0,
        apiVersion: 1,
        lampOffHour: 0,
        lampOffMinute: 0,
        lampOnHour: 0,
        lampOnMinute: 0,
        mode: 0,
        seedingDuration: 0,
        totalDuration: 0,
        wateringDuration: 0,
        wateringMinute: 0,
      });
      if (isDeveloper) {
        alert(JSON.stringify(response, undefined, 2));
      }
      remove(`floor_${modalProps.floorNumber}`);
      modalProps.setUpdateHandler();
      await presentToast({
        message: `${t("homePage.stopFloorModal.toastSuccessTitle", { floorNumber: modalProps.floorNumber })}`,
        duration: 2000,
        cssClass: "custom-toast",
      });
    } catch (error) {
      if (isDeveloper) {
        alert(JSON.stringify(error, undefined, 2));
      }
      await presentToast({
        message: `${t("homePage.stopFloorModal.toastError", { floorNumber: modalProps.floorNumber })}`,
        duration: 2000,
        cssClass: "custom-toast custom-toast_danger",
      });
    } finally {
      setCanDismiss(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canDismiss) {
      modal.current?.dismiss(input.current?.value, "confirm");
    }
  }, [canDismiss]);

  return (
    <IonModal canDismiss={canDismiss} className="custom-modal" ref={modal} trigger={modalProps.modalId}>
      <div className="custom-modal__container">
        <p className="custom-modal__title">
          {t("homePage.stopFloorModal.title", { floorNumber: modalProps.floorNumber })}
        </p>
        <p className="custom-modal__subtitle">{t("homePage.stopFloorModal.subTitle")}</p>
        <p className="custom-modal__subtitle">{t("homePage.stopFloorModal.description")}</p>
        <IonButton disabled={loading} onClick={stopFloorHandler} expand="block">
          {t("homePage.stopFloorModal.confirmButton")}
        </IonButton>
        <IonButton disabled={loading} color="light" expand="block" onClick={() => modal.current?.dismiss()}>
          {t("homePage.stopFloorModal.cancelButton")}
        </IonButton>
      </div>
    </IonModal>
  );
};

export { StopFloorModal };
