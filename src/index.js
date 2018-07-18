import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// import { ConnectedRouter } from 'connected-react-router';

import store from './createStore';

const token = localStorage.getItem('token');

if(token){
  store.dispatch({ type: 'AUTH_USER', payload: token });
}

ReactDOM.render(
  <Provider store = {store}>    
      <App />    
  </Provider>
, document.getElementById('root'));
registerServiceWorker();

