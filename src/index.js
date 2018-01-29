import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';
import store from './utils/store';

//import './utils/serviceWorker';

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>
    , document.getElementById('root'));


function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js')
        .then(() => {
          console.log("service worker registered");
        })
        .catch((e) => {
          console.log("service worker registration failed", e);
        });
  }
}

registerServiceWorker();