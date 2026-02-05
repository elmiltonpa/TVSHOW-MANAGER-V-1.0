import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en.json';
import translationES from './locales/es.json';

// Recursos de traducción
const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

i18n
  // Detectar idioma del usuario
  .use(LanguageDetector)
  // Pasar la instancia a react-i18next
  .use(initReactI18next)
  // Inicializar i18next
  .init({
    resources,
    fallbackLng: 'en', // Idioma por defecto si falla la detección
    debug: true, // Útil para desarrollo, puedes ponerlo en false para producción

    interpolation: {
      escapeValue: false, // React ya protege contra XSS
    },
  });

export default i18n;