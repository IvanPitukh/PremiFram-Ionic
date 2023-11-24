import { IonImg } from "@ionic/react";
import React from "react";

interface ILoader {
  title?: string | null;
  description?: string | null;
}

// FIXME: Add i18n
const Loader: React.FC<ILoader> = ({ title = "Please wait...", description = "Switching the floor off" }) => {
  return (
    <div className="loader">
      <div className="loader__container">
        <p className="loader__title">{title}</p>
        <IonImg className="loader__logo" alt="icon" src="./assets/logo.svg" />
        <IonImg className="loader__gif" alt="icon" src="./assets/loader.gif" />
        <p className="loader__description">{description}</p>
      </div>
    </div>
  );
};

export { Loader };
