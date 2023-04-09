import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landing from './Landing';
import reportWebVitals from './reportWebVitals';
import { WindowSizeObserverProvider } from './tools/WindowSize';
import { I18nextProvider } from 'react-i18next';
import i18next, { InitOptions } from 'i18next';

import translationEN from './assets/translations/en.json';
import translationUA from './assets/translations/ua.json';
import translationRU from './assets/translations/ru.json';
import translationDE from './assets/translations/de.json';
import { Toaster } from 'react-hot-toast';
import { ClientTools } from './tools/ClientTools';

i18next.init({
  lng: ClientTools.getPrefferedLanguage(),
  interpolation: {
    prefix: '{',
    suffix: '}',
  },
  resources: {
    en: {
      translation: translationEN,
    },
    ua: {
      translation: translationUA,
    },
    ru: {
      translation: translationRU,
    },
    de: {
      translation: translationDE,
    },
  },
  //debug: true,
} as InitOptions);

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <WindowSizeObserverProvider>
        <Toaster
          toastOptions={{
            style: {
              background: 'var(--ui-background-body)',
              color: 'var(--ui-text)',
            },
          }}
        />
        <Landing />
      </WindowSizeObserverProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
