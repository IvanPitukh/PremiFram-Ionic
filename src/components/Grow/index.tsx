import { IonButton, IonRow, useIonRouter } from "@ionic/react";
import React from "react";

const Grow: React.FC = () => {
  const navigation = useIonRouter();
  return (
    <div className="content-container" style={{ padding: "15px" }}>
      <IonRow>
        <IonButton
          onClick={() => navigation.push("/grow/floors-statuses", "forward", "push")}
          style={{ width: "100%", marginBottom: 10 }}
          expand="full"
          size="default"
        >
          Froors status
        </IonButton>
      </IonRow>
      <IonRow>
        <IonButton style={{ width: "100%", marginBottom: 10 }} expand="full" size="default">
          Sensors data
        </IonButton>
      </IonRow>
      <IonRow>
        <IonButton style={{ width: "100%", marginBottom: 10 }} expand="full" size="default">
          Start Growing
        </IonButton>
      </IonRow>
    </div>
  );
};

export { Grow };
