import { IonIcon } from "@ionic/react";
import { pulse } from "ionicons/icons";
import "./ErrorComponent.css";
export const ErrorComponnet = ({ error }: { error: string }) => {
  return (
    <div className="error">
      <IonIcon icon={pulse} size="large" />
      <div>{error}</div>
    </div>
  );
};
