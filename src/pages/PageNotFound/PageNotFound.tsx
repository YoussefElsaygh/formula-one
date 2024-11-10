import React from "react";
import { IonContent, IonPage, IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./PageNotFound.css";
const PageNotFound: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="ion-padding ">
        <div className="not-found-container">
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          <IonButton onClick={() => history.replace("/")}>Go to Home</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PageNotFound;
