import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// TODO: move translations closer to where they're used
import * as enTranslations from '../src/locales/en/main.json';
import * as ptTranslations from '../src/locales/pt/main.json';


i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: { main: enTranslations },
        pt: { main: ptTranslations }
    },

    // have a common namespace used around the full app
    ns: ['main'],
    defaultNS: 'main',

    debug: true,

    interpolation: {
        escapeValue: false // not needed for react!!
    }
});

export default i18n;
