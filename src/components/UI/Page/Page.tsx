import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonSpinner,
} from "@ionic/react";
import "./Page.css";
export const Page = ({
  title,
  children,
  isLoading,
}: {
  title: string;
  children: JSX.Element | JSX.Element[];
  isLoading?: boolean;
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isLoading ? (
          <div className="loader-container">
            <IonSpinner name="crescent" />
          </div>
        ) : (
          children
        )}
      </IonContent>
    </IonPage>
  );
};
