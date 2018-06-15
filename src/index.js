import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import store from './createStore';


ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
