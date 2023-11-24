import React, { useState, useRef } from "react";
import { IonButton, IonIcon, IonModal, IonRippleEffect, useIonToast } from "@ionic/react";
import { add, remove } from "ionicons/icons";
import { get, set } from "../../data/IonicStorage";
import { useTranslation } from "react-i18next";

interface IAddDaysModal {
  modalId: string;
  floorNumber: number;
  setUpdateHandler: any;
}

const AddDaysModal: React.FC<IAddDaysModal> = (modalProps: IAddDaysModal) => {
  const { t } = useTranslation();
  const [presentToast] = useIonToast();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [days, setDays] = useState(0);

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  const addDaysHandler = () => setDays((prev) => prev + 1);
  const removeDaysHandler = () => {
    if (days !== 0) {
      setDays((prev) => prev - 1);
    }
  };

  const confirmHandler = async () => {
    try {
      const matchFloor = await get(`floor_${modalProps.floorNumber}`);
      if (!matchFloor) {
        return await presentToast({
          message: `${t("homePage.addDaysModal.toastError")}`,
          duration: 2000,
          cssClass: "custom-toast custom-toast_danger",
        });
      }
      const prepareLocalFloorData = {
        ...matchFloor,
        addDays: matchFloor.addDays + days,
        updatedAt: Date.now(),
      };
      await set(`floor_${modalProps.floorNumber}`, prepareLocalFloorData);
      await presentToast({
        message: `${t("homePage.addDaysModal.toastSuccessTitle", { days })}`,
        duration: 2000,
        cssClass: "custom-toast",
      });
      modalProps.setUpdateHandler();
    } catch (error) {
      await presentToast({
        message: `${t("homePage.addDaysModal.toastError")}`,
        duration: 2000,
        cssClass: "custom-toast custom-toast_danger",
      });
    } finally {
      confirm();
    }
  };

  return (
    <IonModal className="custom-modal custom-modal_counter" ref={modal} trigger={modalProps.modalId}>
      <div className="custom-modal__container">
        <p className="custom-modal__title">{t("homePage.addDaysModal.title")}</p>
        <p className="custom-modal__subtitle">{t("homePage.addDaysModal.subTitle")}</p>
        <p className="custom-modal__description">{t("homePage.addDaysModal.description")}</p>
        <div className="custom-modal__counter">
          <button onClick={removeDaysHandler} className="ion-activatable ripple-parent custom-modal__counter-btn">
            <IonIcon icon={remove} />
            <IonRippleEffect />
          </button>
          <span className="custom-modal__counter-number">{days}</span>
          <button onClick={addDaysHandler} className="ion-activatable ripple-parent custom-modal__counter-btn">
            <IonIcon icon={add} />
            <IonRippleEffect />
          </button>
        </div>
        <IonButton disabled={days <= 0} expand="block" onClick={confirmHandler}>
          {t("homePage.addDaysModal.confirmButton")}
        </IonButton>
        <IonButton color="light" expand="block" onClick={confirm}>
          {t("homePage.addDaysModal.cancelButton")}
        </IonButton>
      </div>
    </IonModal>
  );
};

export { AddDaysModal };
