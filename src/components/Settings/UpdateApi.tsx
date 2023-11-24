import { IonButton, IonInput, IonItem, IonLabel, IonText, useIonRouter } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { get, set } from "../../data/IonicStorage";
import { useForm } from "react-hook-form";
import { storageItems } from "../../types";
import { useTranslation } from "react-i18next";

const SetApi: React.FC = () => {
  const navigation = useIonRouter();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange" });

  const [currentApi, currentApiSet] = useState<string>();
  const [updateHandler, updateHandlerSet] = useState<boolean>();

  const onSubmit = async (data: any) => {
    const { api_url } = data;
    await set(storageItems.API_URL, api_url);
    currentApiSet(`${api_url}`);
    updateHandlerSet((prev) => !prev);
  };

  const checkApi = async () => {
    const apiAdress = await get(storageItems.API_URL);
    currentApiSet(`${apiAdress}`);
    updateHandlerSet((prev) => !prev);
  };

  useEffect(() => {
    checkApi();
  }, []);

  return (
    <div className="content-container offset-content settings">
      <div className="settings__list-with-details">
        <form onSubmit={handleSubmit(onSubmit)} className="settings__list">
          <IonItem className="settings__item" fill="outline" mode="md">
            <IonLabel position="stacked">
              {t("setApiPage.setApiLabel")} <IonText color="danger">*</IonText>
            </IonLabel>
            <IonInput style={{ width: "100%" }} {...register("api_url", { required: true, minLength: 2, maxLength: 200 })} inputmode="text" />
          </IonItem>
          <br />
          <IonButton type="submit">{t("setApiPage.submitButton")}</IonButton>
          {/* FIXME: Set color="secondary" */}
          <IonButton onClick={() => navigation.push("/app/settings", "back", "push")} type="submit">
            {t("setApiPage.backButton")}
          </IonButton>
          <IonText style={{ padding: "10px 5px" }} className="settings__item">
            <div>{t("setApiPage.currentApiText")}:</div>
            <small>{currentApi}</small>
          </IonText>
        </form>
      </div>
    </div>
  );
};

export { SetApi };
