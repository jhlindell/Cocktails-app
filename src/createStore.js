import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history'
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { logger } from 'redux-logger';

export const history = createBrowserHistory();
const reactRouterMiddleware = routerMiddleware(history); 

const middleWares = [
  reduxThunk,
  logger,
  reactRouterMiddleware
]

const store = createStore(
  connectRouter(history)(reducers), 
  composeWithDevTools(applyMiddleware(...middleWares)));

export default store;