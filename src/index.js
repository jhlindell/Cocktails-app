import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { ConnectedRouter } from 'connected-react-router'

import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
// import { browserHistory } from 'react-router'
import reducers from './reducers';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { logger } from 'redux-logger';

const history = createBrowserHistory();
const reactRouterMiddleware = routerMiddleware(history); 

const middleWares = [
  thunk,
  logger,
  reactRouterMiddleware
]

const store = createStore(
  connectRouter(history)(reducers), 
  composeWithDevTools(applyMiddleware(...middleWares)));

ReactDOM.render(
  <Provider store = {store}>
    <ConnectedRouter history={history}>
      <App history={history}/>
    </ConnectedRouter>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
