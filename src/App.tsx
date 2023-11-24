import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact, useIonViewDidEnter, useIonViewWillEnter } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/reset.scss";
import "./theme/fonts.scss";
import "./theme/variables.scss";
import "./index.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StartPage } from "./pages/StartPage";
import { Tabs } from "./pages/Tabs";
import { useEffect } from "react";
import { createStore, get, SELECTED_LANGUAGE, set } from "./data/IonicStorage";
import { i18Languages, storageItems } from "./types";
import { ENDPOINT } from "./api";

import { Globalization } from "@awesome-cordova-plugins/globalization/";
import { useTranslation } from "react-i18next";
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
setupIonicReact();

const App: React.FC = () => {
  const { i18n } = useTranslation();

  const setStatusBarStyle =  () => {
     StatusBar.setBackgroundColor({ color: "#58c45a"})
  };

 

  useEffect(() => {
    const setupStore = async () => {
      await createStore();
      
      await SplashScreen.show({
        showDuration: 2000,
        autoHide: true,
      });
      const user = await get("user");
      setStatusBarStyle  ()
      if (!user) {
        await set("user", `${Date.now()}`);
      }
      // DEFINE REAL API HERE
      const existApi = await get(storageItems.API_URL);
      if (!existApi) {
        await set(storageItems.API_URL, ENDPOINT);
      }
      const SKIP_ONBOARDING = await get(storageItems.SKIP_ONBOARDING);
      if (!SKIP_ONBOARDING) {
        await set(storageItems.SKIP_ONBOARDING, false);
      }

      // Check language
      const SELECTED_LANGUAGE_APP = await get(SELECTED_LANGUAGE);
      if (SELECTED_LANGUAGE_APP) {
        i18n.changeLanguage(SELECTED_LANGUAGE_APP);
      } else {
        let currentLanguage = await Globalization.getLocaleName();
        if (currentLanguage.value.toLocaleLowerCase().startsWith("en")) {
          i18n.changeLanguage(i18Languages.en.value);
        }
        if (currentLanguage.value.toLocaleLowerCase().startsWith("es") || currentLanguage.value.toLocaleLowerCase().startsWith("et")) {
          i18n.changeLanguage(i18Languages.et.value);
        }
      }
    };
    setupStore();
  }, []);

  const queryClient = new QueryClient();
  return (
    <IonApp className="app">
      <QueryClientProvider client={queryClient}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/" component={StartPage} />
            <Route path="/app" component={Tabs} />
          </IonRouterOutlet>
        </IonReactRouter>
      </QueryClientProvider>
    </IonApp>
  );
};

export default App;
