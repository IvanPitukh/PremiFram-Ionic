import { IonButton, IonContent, IonIcon, IonPage, IonRippleEffect } from "@ionic/react";
import { useTranslation } from "react-i18next";
import CustomNavbar from "../../components/CustomNavbar";
import { modalIds } from "../../types";
import FeedbackModal from "./FeedbackModal";

const HelpPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <IonPage>
      <IonContent fullscreen>
        <CustomNavbar title="Help" description={t("helpPage.appBarDescription")} />
        <div className="content-container offset-content help">
          <div className="help__list">
            <button className="ion-activatable ripple-parent help__item">
              <IonIcon className="help__icon" src="./assets/icon/icon-list.svg" />
              <span className="help__text">{t("helpPage.aboutText")}</span>
              <IonRippleEffect />
            </button>
            <button className="ion-activatable ripple-parent help__item">
              <IonIcon className="help__icon" src="./assets/icon/icon-map.svg" />
              <span className="help__text">{t("helpPage.locationText")}</span>
              <IonRippleEffect />
            </button>
            <a href="mailto:info@premifarm.com" className="ion-activatable ripple-parent help__item">
              <IonIcon className="help__icon" src="./assets/icon/icon-email.svg" />
              <span className="help__text">info@premifarm.com</span>
              <IonRippleEffect />
            </a>
          </div>

          <IonButton id={modalIds.feedbackModal} expand="block" size="default">
            {t("helpPage.contactUsButton")}
          </IonButton>
        </div>
      </IonContent>
      <FeedbackModal />
    </IonPage>
  );
};

export { HelpPage };
