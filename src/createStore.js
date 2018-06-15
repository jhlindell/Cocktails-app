import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

let middleWare = [reduxThunk, createLogger];

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;