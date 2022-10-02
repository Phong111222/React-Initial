import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: { loadPath: '/assets/i18n/{{ns}}/{{lng}}.json' },
    lng: 'en',
    supportedLngs: ['de', 'en'],
    fallbackLng: 'de',
    load: 'languageOnly',
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: { escapeValue: false, formatSeparator: ',' },
    react: { useSuspense: true },
  });

export default i18n;
