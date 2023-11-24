import React, { useState, useRef, useEffect } from "react";
import { IonButton, IonModal, useIonToast } from "@ionic/react";
import { modalIds } from "../../types";
import ApiService from "../../api/ApiService";
import { LocalNotifications } from "@capacitor/local-notifications";
import { clear, FLOOR_1, FLOOR_2, FLOOR_3, FLOOR_4, remove } from "../../data/IonicStorage";
import { UIStore } from "../../pullstate";
import { useTranslation } from "react-i18next";

interface IStopAllFloorsModal {
  setUpdateHandler: any;
}

const StopAllFloorsModal: React.FC<IStopAllFloorsModal> = ({ setUpdateHandler }: IStopAllFloorsModal) => {
  const { t } = useTranslation();
  const { isDeveloper } = UIStore.useState((state) => state);
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [canDismiss, setCanDismiss] = useState(true);
  const [presentToast] = useIonToast();

  const stopAllFloorsHandler = async () => {
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
      setLoading(true);
      const response = await ApiService.disableAllFloors();
      if (isDeveloper) {
        alert(JSON.stringify(response, undefined, 2));
      }
      try {
        await remove(FLOOR_1);
      } catch (error) {}
      try {
        await remove(FLOOR_2);
      } catch (error) {}
      try {
        await remove(FLOOR_3);
      } catch (error) {}
      try {
        await remove(FLOOR_4);
      } catch (error) {}
      try {
      } catch (error) {}
      setUpdateHandler();
      await presentToast({
        message: t("homePage.stopAllFloorsModal.toastSuccessTitle"),
        duration: 2000,
        cssClass: "custom-toast",
      });
      // FIXME: Delete local notifications
      LocalNotifications.schedule({
        notifications: [
          {
            title: "All floors disabled at",
            body: `All floors disabled at ${timeObject.hour}:${timeObject.minute}:${timeObject.second} on ${timeObject.day}.${timeObject.month}.${timeObject.year}`,
            id: 1,
            actionTypeId: "info",
            extra: null,
          },
        ],
      });
    } catch (error) {
      if (isDeveloper) {
        alert(JSON.stringify(error, undefined, 2));
      }
      await presentToast({
        message: t("homePage.stopAllFloorsModal.toastError"),
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
    <IonModal canDismiss={canDismiss} className="custom-modal" ref={modal} trigger={modalIds.stopAllFloorsModal}>
      <div className="custom-modal__container">
        <p className="custom-modal__title">{t("homePage.stopAllFloorsModal.title")}</p>
        <p className="custom-modal__subtitle">{t("homePage.stopAllFloorsModal.subTitle")}</p>
        <p className="custom-modal__subtitle">{t("homePage.stopAllFloorsModal.description")}</p>
        <IonButton disabled={loading} onClick={stopAllFloorsHandler} expand="block">
          {t("homePage.stopAllFloorsModal.confirmButton")}
        </IonButton>
        <IonButton disabled={loading} color="light" expand="block" onClick={() => modal.current?.dismiss()}>
          {t("homePage.stopAllFloorsModal.cancelButton")}
        </IonButton>
      </div>
    </IonModal>
  );
};

export { StopAllFloorsModal };
