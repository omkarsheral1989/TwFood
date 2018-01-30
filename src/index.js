import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';
import store from './utils/store';

import registerServiceWorker from './utils/registerServiceWorker';
import {registerForegroundFCMHandler} from './utils/cloudMessaging';

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
registerForegroundFCMHandler();