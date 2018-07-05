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

const appReducer = combineReducers({
  stockItemList,
  stockItem,
  newStockItem,
  recipeList,
  recipe
});

export default appReducer;