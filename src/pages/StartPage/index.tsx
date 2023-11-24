import { IonButton, IonContent, IonPage, useIonRouter, IonImg, IonSlides, IonSlide } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { Error } from "./Error";
import ApiService from "../../api/ApiService";
import { get, set } from "../../data/IonicStorage";
import { storageItems } from "../../types";
import timer from "../../hooks/useTimeout";
import { UIStore } from "../../pullstate";
import { Trans, useTranslation } from "react-i18next";
// TODO: Rename to OnboardingPage
const StartPage: React.FC = () => {
  const { t } = useTranslation();
  const mainButtonRef = useRef(null);
  const secondButtonRef = useRef(null);
  const { isDeveloper } = UIStore.useState((s) => s);
  const navigation = useIonRouter();
  const [isPageReady, isPageReadySet] = useState<boolean>(false);
  const [realLoading, realLoadingSet] = useState<boolean>(false);
  const [demoLoading, demoLoadingSet] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [currentApi, currentApiSet] = useState<string>();
  const [lastSlide, setlastSlide] = useState(false);
  const [updateHandler, updateHandlerSet] = useState<boolean>();

  const checkApi = async () => {
    const apiAdress = await get(storageItems.API_URL);
    currentApiSet(`${apiAdress}`);
    updateHandlerSet((prev) => !prev);
  };

  const cancelHandler = async () => {
    setError(false);
    // @ts-ignore
    mainButtonRef.current.innerText = t("onboardingPage.slide4MainButton");
    // @ts-ignore
    secondButtonRef.current.innerText = t("onboardingPage.slide4SecondButton");

    realLoadingSet(false);
    demoLoadingSet(false);
  };

  const setErrorHandler = () => {
    setError((prev) => !prev);
  };

  const mainButtonHandler = async () => {
    if (lastSlide) {
      setError(false);
      realLoadingSet(true);
      // @ts-ignore
      mainButtonRef.current.innerText = t("onboardingPage.slide4MainButtonLoading");
      await set(storageItems.API_URL, `http://192.168.4.1`);
      try {
        const response = await ApiService.ping();
        UIStore.update((state) => {
          state.isDemoMode = false;
        });
        if (isDeveloper) {
          alert(JSON.stringify(response, undefined, 2));
        }
        navigation.push("/app", "forward", "push");
      } catch (error) {
        if (isDeveloper) {
          alert(JSON.stringify(error, undefined, 2));
        }
        setError(true);
      } finally {
        realLoadingSet(false);
        // @ts-ignore
        mainButtonRef.current.innerText = t("onboardingPage.slide4MainButton");
      }
    } else {
      swiperRef.current?.slideNext();
    }
  };

  const secondButtonHandler = async () => {
    if (lastSlide) {
      setError(false);
      demoLoadingSet(true);
      // @ts-ignore
      secondButtonRef.current.innerText = t("onboardingPage.slide4SecondButtonLoading");
      await set(storageItems.API_URL, `https://5881e728-a0aa-42cc-b6d1-1cf0d9036340.mock.pstmn.io`);
      try {
        const response = await ApiService.ping();
        UIStore.update((state) => {
          state.isDemoMode = true;
        });
        if (isDeveloper) {
          alert(JSON.stringify(response, undefined, 2));
        }
        navigation.push("/app", "forward", "push");
      } catch (error) {
        if (isDeveloper) {
          alert(JSON.stringify(error, undefined, 2));
        }
        setError(true);
      } finally {
        demoLoadingSet(false);
        // @ts-ignore
        secondButtonRef.current.innerText = t("onboardingPage.slide4SecondButton");
      }
    } else {
      try {
        swiperRef.current?.slideTo(3);
      } catch (error) {}
    }
  };

  const dontShowHandler = async () => {
    const SKIP_ONBOARDING = await get(storageItems.SKIP_ONBOARDING);
    if (!SKIP_ONBOARDING) {
      await set(storageItems.SKIP_ONBOARDING, true);
    }
    try {
      swiperRef.current?.slideTo(3);
    } catch (error) {}
  };

  const swiperRef = useRef() as any;

  useEffect(() => {
    checkApi();
  }, [updateHandler]);

  return (
    <IonPage className={isPageReady ? "start active" : "start"}>
      <IonContent className="start__content" fullscreen>
        <Error closeHandler={setErrorHandler} active={error} />
        <IonImg alt="icon" src={"./assets/logo.svg"} className={lastSlide ? "start__logo active" : "start__logo"} />
        <div className={lastSlide ? "start__header" : "start__header active"}>
          <p onClick={dontShowHandler} className="start__header-text">
            {t("onboardingPage.dontShowTitle")}
          </p>
        </div>
        <IonSlides
          className="start__slides"
          onIonSlidesDidLoad={async (event) => {
            swiperRef.current = event.target;
            const SKIP_ONBOARDING = await get(storageItems.SKIP_ONBOARDING);
            if (SKIP_ONBOARDING) {
              try {
                event.target.slideTo(3);
              } catch (error) {}
              await timer(500);
              isPageReadySet(true);
            } else {
              await timer(500);
              isPageReadySet(true);
            }
          }}
          onIonSlideWillChange={async (event) => {
            const active = await event.target.getActiveIndex();
            if (active == 2) {
              // @ts-ignore
              mainButtonRef.current.innerText = t("onboardingPage.slide3MainButton");
              // @ts-ignore
              secondButtonRef.current.innerText = t("onboardingPage.slide3SecondButton");
              setlastSlide(false);
            } else if (active == 3) {
              // @ts-ignore
              mainButtonRef.current.innerText = t("onboardingPage.slide4MainButton");
              // @ts-ignore
              secondButtonRef.current.innerText = t("onboardingPage.slide4SecondButton");
              setlastSlide(true);
            } else {
              // @ts-ignore
              mainButtonRef.current.innerText = t("onboardingPage.slide1MainButton");
              // @ts-ignore
              secondButtonRef.current.innerText = t("onboardingPage.slide1SecondButton");
              setlastSlide(false);
            }
          }}
          options={{
            initialSlide: 0,
            slidesPerView: 1,
            speed: 400,
            allowTouchMove: false,
            pagination: false,
            autoHeight: false,
            lazy: false,
          }}
        >
          {/* SLIDE 1 */}
          <IonSlide className="start__slide">
            <div className="start__slide-images">
              <IonImg alt="icon" src={"./assets/onboarding-1.jpg"} className="start__slide-img" />
            </div>
            <div className="start__slide-content">
              <p className="start__slide-title">
                <Trans i18nKey="onboardingPage.slide1Title">{t("onboardingPage.slide1Title")}</Trans>
              </p>
              <p className="start__slide-description">
                <Trans i18nKey="onboardingPage.slide1Description">{t("onboardingPage.slide1Description")}</Trans>
              </p>
            </div>
          </IonSlide>

          {/* SLIDE 2 */}
          <IonSlide className="start__slide">
            <div className="start__slide-images">
              <IonImg alt="icon" src={"./assets/onboarding-2.jpg"} className="start__slide-img" />
            </div>
            <div className="start__slide-content">
              <p className="start__slide-title">
                <Trans i18nKey="onboardingPage.slide2Title">{t("onboardingPage.slide2Title")}</Trans>
              </p>
              <p className="start__slide-description">
                <Trans i18nKey="onboardingPage.slide2Description">{t("onboardingPage.slide2Description")}</Trans>
              </p>
            </div>
          </IonSlide>

          {/* SLIDE 3 */}
          <IonSlide className="start__slide">
            <div className="start__slide-images">
              <IonImg alt="icon" src={"./assets/onboarding-3.jpg"} className="start__slide-img" />
            </div>
            <div className="start__slide-content">
              <p className="start__slide-title">
                <Trans i18nKey="onboardingPage.slide3Title">{t("onboardingPage.slide3Title")}</Trans>
              </p>
              <p className="start__slide-description">
                <Trans i18nKey="onboardingPage.slide3Description">{t("onboardingPage.slide3Description")}</Trans>
              </p>
            </div>
          </IonSlide>
          <IonSlide className="start__slide">
            <div className="start__slide-images">
              <IonImg alt="icon" src={"./assets/onboarding-1.jpg"} className="start__slide-img" />
              <IonImg alt="icon" src={"./assets/loader.gif"} className={realLoading || demoLoading ? "start__slide-img-loader active" : "start__slide-img-loader"} />
            </div>
            <div className="start__slide-content">
              <div className={realLoading || demoLoading ? "start__slide-connection active" : "start__slide-connection"}>{t("onboardingPage.slide4LoadingText")}</div>
              <p className="start__slide-description">
                <Trans i18nKey="onboardingPage.slide4Description">{t("onboardingPage.slide4Description")}</Trans>
              </p>
              <p className="start__slide-subdescription">
                <Trans i18nKey="onboardingPage.slide4Subdescription">{t("onboardingPage.slide4Subdescription")}</Trans>
              </p>
            </div>
          </IonSlide>
        </IonSlides>

        <div className="start__buttons">
          <IonButton
            color="danger"
            type="button"
            className={realLoading || demoLoading ? "start__button" : "start__button hidden"}
            onClick={cancelHandler}
            expand="block"
            size="default"
          >
            {t("onboardingPage.slide4CancelButton")}
          </IonButton>
          <IonButton
            ref={mainButtonRef}
            disabled={realLoading || demoLoading}
            type="button"
            className={realLoading ? "start__button loading" : "start__button"}
            onClick={mainButtonHandler}
            expand="block"
            size="default"
          >
            {t("onboardingPage.slide1MainButton")}
          </IonButton>
          <IonButton
            disabled={realLoading || demoLoading}
            color="light"
            type="button"
            className={demoLoading ? "start__button loading" : "start__button"}
            onClick={secondButtonHandler}
            expand="block"
            size="default"
          >
            <IonImg className={lastSlide ? "start__button-icon active" : "start__button-icon"} src={"./assets/icon/icon-flower-green.svg"} />
            <span ref={secondButtonRef}>{t("onboardingPage.slide1SecondButton")}</span>
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export { StartPage };
