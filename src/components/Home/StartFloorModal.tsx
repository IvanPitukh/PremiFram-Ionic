import React, { useRef, useState } from "react";
import { IonButton, IonModal, useIonToast } from "@ionic/react";
import ApiService from "../../api/ApiService";
import { LocalNotifications } from "@capacitor/local-notifications";
import { createFloor } from "../../data/IonicStorage";
import { getFinishDate } from "../../helpers/getFinishDate";
import { format, parseISO } from "date-fns";
import { UIStore } from "../../pullstate";
import { Trans, useTranslation } from "react-i18next";

interface IStartFloorModal {
  modalId: string;
  floorNumber: number;
  lightsOnAt: string;
  lightsOffAt: string;
  waterDurationSec: string;
  wateringMinuteStart: string;
  seedingInDays: string;
  totalDurationInDays: string;
  setUpdateHandler: any;
}

const StartFloorModal: React.FC<IStartFloorModal> = (modalProps: IStartFloorModal) => {
  const { t } = useTranslation();
  const { isDeveloper } = UIStore.useState((state) => state);
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [canDismiss, setCanDismiss] = useState(true);
  const [presentToast] = useIonToast();

  const startGrowingHandler = async () => {
    let lampOnHour = format(parseISO(modalProps.lightsOnAt), "H");
    let lampOnMinute = format(parseISO(modalProps.lightsOnAt), "m");

    let lampOffHour = format(parseISO(modalProps.lightsOffAt), "H");
    let lampOffMinute = format(parseISO(modalProps.lightsOffAt), "m");

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

      const response = await ApiService.setFloorRecipe({
        enable: 1,
        floor: modalProps.floorNumber,
        lampOnHour: Number(lampOnHour),
        lampOnMinute: Number(lampOnMinute),
        lampOffHour: Number(lampOffHour),
        lampOffMinute: Number(lampOffMinute),
        wateringMinute: Number(modalProps.wateringMinuteStart),
        wateringDuration: Number(modalProps.waterDurationSec),
        seedingDuration: Number(modalProps.seedingInDays),
        totalDuration: Number(modalProps.totalDurationInDays),
      });
      if (isDeveloper) {
        alert(JSON.stringify(response, undefined, 2));
      }
      const totalEndDate = getFinishDate(Date.now(), Number(modalProps.totalDurationInDays), 0);
      createFloor(`floor_${modalProps.floorNumber}`, {
        addDays: 0,
        enable: 1,
        mode: 0,
        floor: Number(modalProps.floorNumber),
        totalDuration: Number(modalProps.totalDurationInDays),
        totalEndDate: totalEndDate,
        // FIXME: Сделать разделение на клиентский и серверный timestamp
        creationTimestamp: Date.now(),
      });
      modalProps.setUpdateHandler();
      await presentToast({
        message: `${t("homePage.startFloorModal.toastSuccessTitle", { floorNumber: modalProps.floorNumber })}`,
        duration: 2000,
        cssClass: "custom-toast",
      });
      // FIXME: Delete local notifications
      LocalNotifications.schedule({
        notifications: [
          {
            title: `Floor ${modalProps.floorNumber} started`,
            body: `Floor ${modalProps.floorNumber} started at ${timeObject.hour}:${timeObject.minute}:${timeObject.second} on ${timeObject.day}.${timeObject.month}.${timeObject.year}`,
            id: 2,
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
        message: `${t("homePage.startFloorModal.toastError", { floorNumber: modalProps.floorNumber })}`,
        duration: 2000,
        cssClass: "custom-toast custom-toast_danger",
      });
    } finally {
      modal.current?.dismiss(input.current?.value, "confirm");
      setCanDismiss(true);
      setLoading(false);
    }
  };

  /* FIXME: Почему то некорректно срабатывает canDismiss */
  // useEffect(() => {
  //   if (canDismiss) {
  //     modal.current?.dismiss(input.current?.value, "confirm");
  //   }
  // }, [canDismiss]);

  return (
    <IonModal className="custom-modal" ref={modal} trigger={modalProps.modalId}>
      {/* FIXME: Почему то некорректно срабатывает canDismiss */}
      {/* <IonModal canDismiss={canDismiss} className="custom-modal" ref={modal} trigger={modalProps.modalId}> */}
      <div className="custom-modal__container">
        <p className="custom-modal__title">{t("homePage.startFloorModal.title", { floorNumber: modalProps.floorNumber })}</p>
        <p className="custom-modal__subtitle">{t("homePage.startFloorModal.subTitle")}</p>
        <ul className="custom-modal__recipe">
          <li className="custom-modal__recipe-item custom-modal__recipe-item_flex">
            <span>{t("homePage.startFloorModal.lightOnAt")}</span>
            <span>{format(parseISO(modalProps.lightsOnAt), "HH:mm")}</span>
          </li>
          <li className="custom-modal__recipe-item custom-modal__recipe-item_flex">
            <span>{t("homePage.startFloorModal.lightOffAt")}</span>
            <span>{format(parseISO(modalProps.lightsOffAt), "HH:mm")}</span>
          </li>
          <li className="custom-modal__recipe-item">
            <div dangerouslySetInnerHTML={{ __html: t("homePage.startFloorModal.watering", { minutes: modalProps.wateringMinuteStart, seconds: modalProps.waterDurationSec }) }} />
          </li>
          <li className="custom-modal__recipe-item custom-modal__recipe-item_flex">
            <span>{t("homePage.startFloorModal.seedingPerion")}</span>
            <span>{modalProps.seedingInDays}</span>
          </li>
          <li className="custom-modal__recipe-item custom-modal__recipe-item_flex">
            <span>{t("homePage.startFloorModal.totalGrowingTime")}</span>
            <span>{modalProps.totalDurationInDays}</span>
          </li>
        </ul>
        <IonButton disabled={loading} expand="block" onClick={startGrowingHandler}>
          {t("homePage.startFloorModal.confirmButton")}
        </IonButton>
        <IonButton disabled={loading} color="light" expand="block" onClick={() => modal.current?.dismiss()}>
          {t("homePage.startFloorModal.cancelButton")}
        </IonButton>
      </div>
    </IonModal>
  );
};

export { StartFloorModal };
