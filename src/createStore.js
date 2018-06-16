import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import { logger } from 'redux-logger';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxThunk, logger)));

export default store;