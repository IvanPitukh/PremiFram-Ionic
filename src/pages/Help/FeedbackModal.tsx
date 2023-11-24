import React, { useState, useRef, useEffect } from "react";
import { IonButton, IonModal } from "@ionic/react";
import { modalIds } from "../../types";
import { IonSlides, IonSlide } from "@ionic/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IForm {
  name: string;
}

const FeedbackModal: React.FC = () => {
  const { t } = useTranslation();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [canDismiss, setCanDismiss] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange" });

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }
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
    setCanDismiss(true);
  };

  const onSubmit = async (data: any) => {
    const { name } = data;
    swiperRef.current?.slideNext();
    setCanDismiss(false);
  };

  useEffect(() => {
    if (canDismiss) {
      modal.current?.dismiss(input.current?.value, "confirm");
    }
  }, [canDismiss]);

  return (
    <IonModal canDismiss={canDismiss} className="custom-modal custom-modal_contact" ref={modal} trigger={modalIds.feedbackModal}>
      <div className="custom-modal__container">
        <IonSlides
          onIonSlidesDidLoad={(event) => {
            swiperRef.current = event.target;
          }}
          pager={true}
          options={slideOpts}
        >
          <IonSlide className="custom-modal__slide">
            <p className="custom-modal__title">{t("helpPage.contactUsModal.title")}</p>
            <form onSubmit={handleSubmit(onSubmit)} className="custom-modal__form">
              <div className="custom-modal__form-group">
                <label htmlFor="" className="custom-modal__label">
                  {t("helpPage.contactUsModal.fullNameLabel")}
                </label>
                <input
                  {...register("name", { required: true, minLength: 6, maxLength: 30 })}
                  placeholder={`${t("helpPage.contactUsModal.fullNamePlaceholder")}`}
                  type="text"
                  className="custom-modal__input"
                />
              </div>
              <div className="custom-modal__form-group">
                <label htmlFor="" className="custom-modal__label">
                  {t("helpPage.contactUsModal.phoneNumberLabel")}
                </label>
                <input
                  {...register("phone", { required: true, minLength: 6, maxLength: 14 })}
                  placeholder={`${t("helpPage.contactUsModal.phoneNumberPlaceholder")}`}
                  type="text"
                  className="custom-modal__input"
                />
              </div>
              <div className="custom-modal__form-group">
                <label htmlFor="" className="custom-modal__label">
                  {t("helpPage.contactUsModal.emailLabel")}
                </label>
                <input
                  {...register("email", { required: true, minLength: 3, maxLength: 30 })}
                  placeholder={`${t("helpPage.contactUsModal.emailPlaceholder")}`}
                  type="email"
                  className="custom-modal__input"
                />
              </div>
              <div className="custom-modal__form-group">
                <label htmlFor="" className="custom-modal__label">
                  {t("helpPage.contactUsModal.messageLabel")}
                </label>
                <textarea
                  {...register("message", { required: true, minLength: 6, maxLength: 300 })}
                  placeholder={`${t("helpPage.contactUsModal.messagePlaceholder")}`}
                  className="custom-modal__input custom-modal__input_textarea"
                />
              </div>
              <IonButton disabled={!isValid} type="submit" expand="block">
                {t("helpPage.contactUsModal.confirmButton")}
              </IonButton>
              <IonButton color="light" expand="block" onClick={() => modal.current?.dismiss()}>
                {t("helpPage.contactUsModal.cancelButton")}
              </IonButton>
            </form>
          </IonSlide>
          <IonSlide>
            <div>
              <p className="custom-modal__title">{t("helpPage.contactUsModal.successTitle")}</p>
              <p className="custom-modal__subtitle">{t("helpPage.contactUsModal.successDescription")}</p>
              <IonButton onClick={handleConfirmModal} style={{ width: "100%" }}>
                {t("helpPage.contactUsModal.successButtonDone")}
              </IonButton>
            </div>
          </IonSlide>
        </IonSlides>
      </div>
    </IonModal>
  );
};

export default FeedbackModal;
