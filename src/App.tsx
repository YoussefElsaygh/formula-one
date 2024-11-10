import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";
import { Home } from "./pages/Home/Home";
import { Provider } from "react-redux";
import { store } from "./store";
import { Races } from "./pages/Races/Races";
import { RaceDetails } from "./pages/RaceDetails/RaceDetails";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { persistor } from "./store";

setupIonicReact();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet id="main">
              <Switch>
                <Route path="/" exact={true}>
                  <Home />
                </Route>
                <Route path="/races/:year" exact={true}>
                  <Races />
                </Route>
                <Route path="/race/:year/:round" exact={true}>
                  <RaceDetails />
                </Route>
                <Route path="*">
                  <PageNotFound />
                </Route>
              </Switch>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </PersistGate>
    </Provider>
  );
};

export default App;
