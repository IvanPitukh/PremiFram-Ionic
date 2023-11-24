import { IonButton, IonContent, IonIcon, IonPage, IonRippleEffect, IonText, useIonToast } from "@ionic/react";
import axios from "axios";
import { addCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { $api } from "../../../api";
import ApiService from "../../../api/ApiService";
import CustomNavbar from "../../../components/CustomNavbar";
import { FIRMWARE_FILE, get, set } from "../../../data/IonicStorage";
import timer from "../../../hooks/useTimeout";
import { useTranslation } from "react-i18next";
import { UIStore } from "../../../pullstate";

const UpdateFirmwarePage: React.FC = () => {
  const { isDeveloper, isDemoMode } = UIStore.useState((state) => state);
  const { t } = useTranslation();
  const [presentToast] = useIonToast();
  const [isSucces, isSuccesSet] = useState(false);
  const [isFileAvailable, isFileAvailableSet] = useState(false);
  const [loading, loadingSet] = useState(false);

  const submitHandler = async () => {
    try {
      const res = await axios.get("https://mercury-firmware.s3.eu-north-1.amazonaws.com/prod/mercury-relay-prod.bin", {
        responseType: "blob",
      });
      if (res.status == 200) {
        const urlObject = URL.createObjectURL(res.data);
        try {
          const response = await set(FIRMWARE_FILE, urlObject);
          if (isDeveloper) {
            alert(JSON.stringify(response, undefined, 2));
          }
          isSuccesSet(true);
          return await presentToast({
            message: t("firmwarePage.toastSuccessServerDownload"),
            duration: 2000,
            cssClass: "custom-toast",
          });
        } catch (error) {
          if (isDeveloper) {
            alert(JSON.stringify(error, undefined, 2));
          }
        }
      }
    } catch (error) {
      if (isDeveloper) {
        alert(JSON.stringify(error, undefined, 2));
      }
      return await presentToast({
        message: t("firmwarePage.toastErrorServerDownload"),
        duration: 2000,
        cssClass: "custom-toast custom-toast_danger",
      });
    }

    try {
    } catch (error) {}
  };

  const updateHandler = async () => {
    try {
      isSuccesSet(false);

      const isAvailableBlob = await get(FIRMWARE_FILE);

      if (!isAvailableBlob) {
        return await presentToast({
          message: t("firmwarePage.toastErrorServerUpload2"),
          duration: 2000,
          cssClass: "custom-toast custom-toast_danger",
        });
      } else {
        loadingSet(true);
        const FILE = new File([isAvailableBlob], "blob");
        await timer(3000);
        try {
          let res = null;
          if (isDemoMode) {
            res = await ApiService.updateFirewareDemo({ data: FILE });
            if (isDeveloper) {
              alert(JSON.stringify(res, undefined, 2));
            }
          } else {
            res = await ApiService.updateFireware({ data: FILE });
            if (isDeveloper) {
              alert(JSON.stringify(res, undefined, 2));
            }
          }
        } catch (error) {
          if (isDeveloper) {
            alert(JSON.stringify(error, undefined, 2));
          }
        } finally {
          loadingSet(false);
          return await presentToast({
            message: t("firmwarePage.toastSuccessServerUpload"),
            duration: 2000,
            cssClass: "custom-toast",
          });
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    const updateStatus = async () => {
      const data = await get(FIRMWARE_FILE);
      if (data) {
        isFileAvailableSet(true);
      }
    };
    updateStatus();
  }, [isSucces]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <CustomNavbar backUrl="/app/settings" size="small" title="Update firmware" />
        <div className="content-container offset-content settings">
          <div className="firmware">
            <div className="firmware__container">
              <p className="firmware__title">{t("firmwarePage.title")}</p>
              <button onClick={submitHandler} className="ion-activatable ripple-parent firmware__download">
                <IonIcon className="firmware__icon" icon={addCircleOutline} />
                <IonRippleEffect />
              </button>
              {!isSucces ? null : (
                <IonText>
                  <p style={{ margin: "10px 0" }}>{t("firmwarePage.afterDownloadingFileMessage")}</p>
                </IonText>
              )}
              <IonButton onClick={updateHandler} disabled={!isFileAvailable || loading} expand="full">
                {loading ? `${t("firmwarePage.uploadingButtonText")}` : `${t("firmwarePage.submitButton")}`}
              </IonButton>
              {/* FIXME: Add back button */}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export { UpdateFirmwarePage };
