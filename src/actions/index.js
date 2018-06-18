import axios from 'axios';
import { push, replace } from 'connected-react-router'


const URL = 'http://localhost:8000';

export function getStockItemList(){
  return function(dispatch){
    axios.get(`${URL}/api/stock_items/`)
      .then((response) => {
        dispatch({ type: 'STOCK_ITEM_LIST', payload: response.data });
      })
      .catch((error) => {
        console.log('error getting stock items');
      });
  }
}

export function clearStockItemList(){
  return { type: 'CLEAR_STOCK_ITEM_LIST' };
}

export function getStockItemById(id){
  return function(dispatch){
    axios.get(`${URL}/api/stock_items/${id}`)
      .then((response) => {
        dispatch({ type: 'SINGLE_STOCK_ITEM', payload: response.data });
      })
      .catch((error) => {
        console.log('error getting stock item by id');
        dispatch(push('/stockitems'));
      });
  }
}

export function clearSingleStockItem(){
  return { type: 'CLEAR_SINGLE_STOCK_ITEM' };
}

export function createStockItem(item){
  return function(dispatch){
    axios.post(`${URL}/api/stock_items/`, item)
      .then((response)=> {
        console.log("response", response);
        dispatch(replace('/stockitems'));
      })
      .catch((error) => {
        //create error container to post error to
        console.log('error creating stock item', error);
      });
  }
}

export function deleteStockItem(id){
  return function(dispatch){
    axios.delete(`${URL}/api/stock_items/${id}`)
      .then((response)=> {
        console.log("delete response: ", response);
        dispatch(replace('/stockitems'));
      })
      .catch((error) => {
        //create error container to post error to
        console.log('error deleting stock item', error);
      });
  }
}