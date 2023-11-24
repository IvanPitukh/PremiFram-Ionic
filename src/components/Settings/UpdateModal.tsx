import React, { useState, useRef } from "react";
import { IonRippleEffect, IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonIcon } from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { modalIds } from "../../types";
import { addCircleOutline, arrowBack } from "ionicons/icons";

const UpdateModal: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState("This modal example uses triggers to automatically open a modal when the button is clicked.");

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  return (
    <IonModal ref={modal} trigger={modalIds.updateFirmware} onWillDismiss={(ev) => onWillDismiss(ev)}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              <IonIcon style={{ fontSize: 24 }} icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Update firmware</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding upload-modal">
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <IonTitle style={{ padding: 0, flex: "0 0 auto" }}>Upload file</IonTitle>
          <div className="ion-activatable ripple-parent rounded-rectangle upload-modal__dropzone">
            <IonIcon size="large" className="upload-modal__dropzone-icon" icon={addCircleOutline} />
            <IonRippleEffect></IonRippleEffect>
          </div>
          <div style={{ marginTop: "auto" }}>
            <IonButton expand="block" onClick={() => confirm()}>
              Update
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export { UpdateModal };
