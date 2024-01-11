import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    supprotedLngs: ['ro', 'gb', 'hu'],
    fallbackLng: 'ro',
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path'],
      caches: ['cookie']
    },
    backend: {
      loadPath: 'src/constants/languages/{{lng}}/translation.json',
    },
    react: {
      useSuspense: false
    }
  });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
