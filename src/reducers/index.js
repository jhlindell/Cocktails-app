import { combineReducers } from 'redux';

function stockItemList(state = [], action){
  switch(action.type){
    case 'STOCK_ITEM_LIST':
      return action.payload;
    case 'CLEAR_STOCK_ITEM_LIST':
      return [];
    default:
      return state;
  }
}

function stockItem(state = null, action){
  switch(action.type){
    case 'SINGLE_STOCK_ITEM':
      return action.payload;
    case 'CLEAR_SINGLE_STOCK_ITEM':
      return null;
    default:
      return state;
  }
}

function newStockItem(state = null, action){
  switch(action.type){
    case 'NEW_STOCK_ITEM':
      return action.payload;
    case 'CLEAR_NEW_STOCK_ITEM':
      return null;
    default:
      return state;
  }
}

function recipeList(state = [], action){
  switch(action.type){
    case 'RECIPE_LIST':
      return action.payload;
    case 'CLEAR_RECIPE_LIST':
      return [];
    default:
      return state;
  }
}

function recipe(state = null, action){
  switch(action.type){
    case 'SINGLE_RECIPE':
      return action.payload;
    case 'CLEAR_SINGLE_RECIPE':
      return null;
    default:
      return state;
  }
}

const styleErrorCode = (code) => {
  if(code.message) {
    return (code.message.includes('401')) ? 'bad username or password': code.message 
  } else {
    return code
  }
}

function authReducer(state = {}, action){
  switch(action.type) {
    case 'AUTH_USER':
      localStorage.setItem('token', action.payload);
      return { ...state, error: '', authenticated: true, token: action.payload };
    case 'UNAUTH_USER':
      localStorage.removeItem('token');
      return { ...state, authenticated: false };
    case 'AUTH_ERROR':
      let error = styleErrorCode(action.payload)
      return { ...state, error };
    case 'CLEAR_AUTH_ERROR':
      error = '';
      return { ...state, error };
    default:
      return state;
  }
}

function userName(state = null, action){
  switch(action.type) {
    case 'SET_USERNAME':
      return action.payload;
    default:
      return state;
  }
}

function messageReducer(state = [], action){
  switch(action.type){
    case 'ADD_MESSAGE':
      const message = action.payload;
      return [ ...state, message ];

    case 'CLEAR_MESSAGE':
      let stateArray = state;
      let filteredArray = stateArray.filter(message => {
        if(message.id && message.id !== action.payload){
          return message;
        }
        return null;
      });
      return filteredArray;

    default:
      return state;
  }
}

const appReducer = combineReducers({
  stockItemList,
  stockItem,
  newStockItem,
  recipeList,
  recipe,
  auth: authReducer,
  userName,
  messageReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;