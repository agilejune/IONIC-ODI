import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Device } from '@capacitor/device';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import common_in from "./translations/in/common.json";
import common_en from "./translations/en/common.json";

Device.getLanguageCode()
.then(code => {
  console.log(code);
  i18next.init({
    interpolation: { escapeValue: false },        // React already does escaping
    lng: code.value,                              // language to use
    resources: {
        en: {
            common: common_en               
        },
        in: {
            common: common_in
        },
    },
  });

  ReactDOM.render(
    <React.StrictMode>
     <I18nextProvider i18n={i18next}>
         <App/>
     </I18nextProvider>
    </React.StrictMode>, document.getElementById('root')
  );
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://cra.link/PWA
  serviceWorkerRegistration.register();
})
.catch(error => console.log(error));



