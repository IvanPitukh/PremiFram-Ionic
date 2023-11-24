import { useState, useRef } from "react";
import { IonModal, IonItem, IonLabel, IonInput } from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";

function TestModal2() {
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
    <IonModal className="custom-modal" ref={modal} trigger="open-modal2" onWillDismiss={(ev) => onWillDismiss(ev)}>
      {/* <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Welcome</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => confirm()}>
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader> */}
      <div className="custom-modal__container">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates reprehenderit, dicta et voluptatum inventore at deserunt error qui autem, facere perspiciatis tempore
        temporibus animi exercitationem repellendus id eligendi cumque aspernatur, sit nam magni. Nulla officiis totam distinctio omnis illum sed quam praesentium corporis, labore
        aliquam eum porro debitis saepe fugit itaque? Officia consectetur, molestiae modi sequi, voluptatum, delectus ipsum architecto temporibus illum in quia possimus dicta odit
        quas repudiandae blanditiis! Asperiores reprehenderit corporis autem nemo, modi neque possimus temporibus at nihil, aspernatur fugiat libero, quia optio! Ipsa, nihil
        architecto. Enim facilis unde eligendi quasi perspiciatis, nobis laboriosam explicabo provident expedita.
        <IonItem>
          <IonLabel position="stacked">Enter your name</IonLabel>
          <IonInput ref={input} type="text" placeholder="Your name" />
        </IonItem>
      </div>
    </IonModal>
  );
}

export { TestModal2 };
