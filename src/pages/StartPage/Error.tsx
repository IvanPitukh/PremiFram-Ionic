import { IonIcon, IonText } from "@ionic/react";
import { close } from "ionicons/icons";
import React from "react";
import { Trans, useTranslation } from "react-i18next";

interface IError {
  active: boolean;
  closeHandler: any;
}

const Error: React.FC<IError> = ({ active, closeHandler }: IError) => {
  const className = active ? "start__error active" : "start__error";
  const { t, i18n } = useTranslation();

  return (
    <div className={className}>
      <div className="start__error-wrapper">
        <button onClick={closeHandler} className="start__error-close-btn">
          <IonIcon className="start__error-close-icon" icon={close}></IonIcon>
        </button>
        <p className="start__error-title">
          <Trans i18nKey="onboardingPage.errorTitle">{t("onboardingPage.errorTitle")}</Trans>
        </p>
        <p className="start__error-description">
          <Trans i18nKey="onboardingPage.errorDescription">{t("onboardingPage.errorDescription")}</Trans>
        </p>
      </div>
    </div>
  );
};

export { Error };
