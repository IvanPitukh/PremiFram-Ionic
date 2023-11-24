import React, { useState, useRef, useEffect } from "react";
import { IonButton, IonModal, useIonToast } from "@ionic/react";
import { IonSlides, IonSlide } from "@ionic/react";
import { Loader } from "../../shared/Loader";
import ApiService from "../../api/ApiService";
import { remove } from "../../data/IonicStorage";
import { UIStore } from "../../pullstate";
import { Trans, useTranslation } from "react-i18next";
interface ITurnOffTheFloorModal {
  modalId: string;
  floorNumber: number;
  setUpdateHandler: any;
}

const TurnOffTheFloorModal: React.FC<ITurnOffTheFloorModal> = (modalProps: ITurnOffTheFloorModal) => {
  const { t } = useTranslation();
  const { isDeveloper } = UIStore.useState((state) => state);
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [canDismiss, setCanDismiss] = useState(true);
  const [presentToast] = useIonToast();
  
  const stopFloorHandler = async () => {
    try {
      setLoading(true);
      swiperRef.current?.slideNext();
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
      swiperRef.current?.slideNext();
      remove(`floor_${modalProps.floorNumber}`);
      await presentToast({
        message: `${t("homePage.turnOffFloorModal.toastSuccessTitle")}`,
        duration: 2000,
        cssClass: "custom-toast",
      });
    } catch (error) {
      if (isDeveloper) {
        alert(JSON.stringify(error, undefined, 2));
      }
      await presentToast({
        message: `${t("homePage.turnOffFloorModal.toastError")}`,
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
      modalProps.setUpdateHandler();
    }
  }, [canDismiss]);

  // Optional parameters to pass to the swiper instance.
  // See https://swiperjs.com/swiper-api for valid options.
  const slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
    allowTouchMove: false,
    pagination: false,
    autoHeight: true,
  };

  const swiperRef = useRef() as any;

  const handleConfirmModal = () => {
    modal.current?.dismiss(input.current?.value, "confirm");
    modalProps.setUpdateHandler();
  };

  useEffect(() => {
    if (canDismiss) {
      modal.current?.dismiss(input.current?.value, "confirm");
      modalProps.setUpdateHandler();
    }
  }, [canDismiss]);

  return (
    <IonModal canDismiss={canDismiss} className="custom-modal" ref={modal} trigger={modalProps.modalId}>
      <div className="custom-modal__container">
        <IonSlides
          onIonSlidesDidLoad={(event) => {
            swiperRef.current = event.target;
          }}
          pager={true}
          options={slideOpts}
        >
          <IonSlide>
            <div>
              <p className="custom-modal__title">{t("homePage.turnOffFloorModal.title")}</p>
              <p className="custom-modal__subtitle">{t("homePage.turnOffFloorModal.subTitle")}</p>
              <p className="custom-modal__subtitle">{t("homePage.turnOffFloorModal.description")}</p>
              <IonButton disabled={loading} onClick={stopFloorHandler} expand="block">
                {t("homePage.turnOffFloorModal.confirmButton")}
              </IonButton>
              <IonButton color="light" expand="block" onClick={() => modal.current?.dismiss()}>
                {t("homePage.turnOffFloorModal.cancelButton")}
              </IonButton>
            </div>
          </IonSlide>
          <IonSlide onClick={() => swiperRef.current?.slideNext()} style={{ height: "auto" }}>
            <Loader title={t("homePage.turnOffFloorModal.loadingModalTitle")} description={t("homePage.turnOffFloorModal.loadingModalDescription")} />
          </IonSlide>
          <IonSlide style={{ flexDirection: "column", height: "auto" }}>
            <p className="custom-modal__title">{t("homePage.turnOffFloorModal.successSlideTitle")}</p>
            <span className="custom-modal__count">1</span>
            <p className="custom-modal__subtitle">{t("homePage.turnOffFloorModal.successSlideDescription1")}</p>
            <span className="custom-modal__count">2</span>
            <p className="custom-modal__subtitle">{t("homePage.turnOffFloorModal.successSlideDescription2")}</p>
            <p className="custom-modal__description">{t("homePage.turnOffFloorModal.successSlideDescription3")}</p>
            <IonButton onClick={handleConfirmModal} style={{ width: "100%" }}>
            {t("homePage.turnOffFloorModal.successSlideButton")}
            </IonButton>
          </IonSlide>
        </IonSlides>
      </div>
    </IonModal>
  );
};

export { TurnOffTheFloorModal };
