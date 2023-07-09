import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enTrasnlation from 'assets/i18n/translations/en.json';
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // backend: { loadPath: '/assets/i18n/{{ns}}/{{lng}}.json' },
    // lng: 'en',
    // supportedLngs: ['de', 'en'],
    // fallbackLng: 'de',
    // load: 'languageOnly',

    // ns: ['translations'],
    // defaultNS: 'translations',
    // interpolation: { escapeValue: false, formatSeparator: ',' },
    lng: 'en', // if you're using a language detector, do not define the lng option
    debug: false,
    resources: {
      en: {
        translation: enTrasnlation,
      },
    },
    react: { useSuspense: true },
    // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
    // set returnNull to false (and also in the i18next.d.ts options)
    // returnNull: false,
  });

export default i18n;
