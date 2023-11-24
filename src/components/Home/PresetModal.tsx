import React, { useRef, useState } from "react";
import { IonButton, IonModal, IonSlide, IonSlides, useIonToast } from "@ionic/react";
import { presetRecipes, IMockLocalRecipe, i18Languages } from "../../types";
import { useTranslation } from "react-i18next";

interface IPresetModal {
  modalId: string;
  floorNumber: number;
  selectedPresetSetHandler: any;
}

const slideOpts = {
  initialSlide: 0,
  slidesPerView: 1,
  speed: 400,
  allowTouchMove: false,
  pagination: false,
  autoHeight: true,
};

const PresetModal: React.FC<IPresetModal> = ({ floorNumber, modalId, selectedPresetSetHandler }: IPresetModal) => {
  const { t, i18n } = useTranslation();
  const modal = useRef<HTMLIonModalElement>(null);
  const [selectedValue, selectedValueSet] = useState<null | undefined | string>(null);
  const [selectedValuei18n, selectedValuei18nSet] = useState<null | undefined | string>(null);
  const [selectedUniti18n, selectedUniti18nSet] = useState<null | undefined | string>(null);
  const [selectedRecipe, selectedRecipeSet] = useState<null | IMockLocalRecipe>(null);
  const [presentToast] = useIonToast();

  const onChangeHandler = (value: string) => () => {
    if (selectedValue === `${value}`) {
      selectedValueSet(null);
    } else {
      selectedValueSet(`${value}`);
      const matchRecipe = presetRecipes.find((item) => item.name === `${value}`);
      if (matchRecipe) {
        // @ts-ignore
        selectedRecipeSet(matchRecipe);
        if (i18n.language == i18Languages.en.value) {
          selectedValuei18nSet(matchRecipe.meta.en.name);
          selectedUniti18nSet(matchRecipe.meta.en.unit);
        }
        if (i18n.language == i18Languages.et.value) {
          selectedValuei18nSet(matchRecipe.meta.et.name);
          selectedUniti18nSet(matchRecipe.meta.et.unit);
        }
      }
    }
  };

  const swiperRef = useRef() as any;

  const onConfirmSelection = () => {
    swiperRef.current?.slideNext();
  };

  const onFinalConfirm = async () => {
    selectedPresetSetHandler(selectedValue);
    modal.current?.dismiss(undefined, "confirm");
    await presentToast({
      message: `${t("homePage.presetsModal.toastSuccessTitle", { selectedValuei18n })}`,
      duration: 2000,
      cssClass: "custom-toast",
    });
    swiperRef.current?.slidePrev();
  };

  const slidePrevHandler = () => swiperRef.current?.slidePrev();

  return (
    <IonModal className="custom-modal" ref={modal} trigger={modalId}>
      <div className="custom-modal__container">
        <IonSlides
          onIonSlidesDidLoad={(event) => {
            swiperRef.current = event.target;
          }}
          pager={true}
          options={slideOpts}
        >
          <IonSlide className="custom-modal__slide">
            <p className="custom-modal__title">{t("homePage.presetsModal.title")}</p>
            <p className="custom-modal__subtitle">{t("homePage.presetsModal.subTitle", { floorNumber })}</p>
            <div className="custom-modal__recipes">
              {presetRecipes.map(
                // @ts-ignore
                ({
                  name,
                  lampOnHour,
                  lampOnMinute,
                  lampOffHour,
                  lampOffMinute,
                  wateringDuration,
                  wateringMinute,
                  seedingDuration,
                  totalDuration,
                  meta,
                  seeds,
                  unit,
                }: IMockLocalRecipe) => {
                  return (
                    <div onClick={onChangeHandler(name)} key={name} className={selectedValue === name ? "custom-modal__recipes-item active" : "custom-modal__recipes-item"}>
                      {i18n.language == "et" ? meta.et.name : i18n.language == "en" ? meta.en.name : name}
                    </div>
                  );
                }
              )}
            </div>
            <IonButton disabled={!selectedValue ? true : false} onClick={onConfirmSelection} type="button" expand="block">
              {t("homePage.presetsModal.confirmSelectButton")}
            </IonButton>
            <IonButton color="light" expand="block" onClick={() => modal.current?.dismiss()}>
              {t("homePage.presetsModal.cancelButton")}
            </IonButton>
          </IonSlide>
          <IonSlide className="custom-modal__slide">
            <p className="custom-modal__title">{t("homePage.presetsModal.selectedTitle")}</p>
            <p className="custom-modal__description">{t("homePage.presetsModal.selectedSubtitle", { selectedValuei18n })}.</p>
            <p className="custom-modal__description">{t("homePage.presetsModal.selectedDescription", { seeds: selectedRecipe?.seeds })} <span style={{display: 'inline-block',marginLeft: 5}}>{selectedUniti18n}</span>.</p>
            <p className="custom-modal__description" dangerouslySetInnerHTML={{ __html: t("homePage.presetsModal.selectedDescription2") }} />
            <div className="custom-modal__overlay-actions">
              <IonButton className="custom-modal__overlay-action" onClick={slidePrevHandler}>
                {t("homePage.presetsModal.backButton")}
              </IonButton>
              <IonButton onClick={onFinalConfirm} className="custom-modal__overlay-action" type="button">
                {t("homePage.presetsModal.confirmButton")}
              </IonButton>
            </div>
          </IonSlide>
        </IonSlides>
      </div>
    </IonModal>
  );
};

export { PresetModal };
