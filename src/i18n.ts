import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./locales/en/translation.json";
import russian from "./locales/ru/translation.json";
import estonian from "./locales/et/translation.json";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  lng: "en",
  interpolation: {
    escapeValue: true, // not needed for react as it escapes by default
  },
  resources: {
    en: english,
    et: estonian,
  },
  react: {
    useSuspense: true,
  },
});

export default i18n;
