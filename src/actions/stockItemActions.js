import axios from 'axios';
import { addMessageToContainer } from './index';
const URL = 'http://localhost:8000';

export function getStockItemList(page, limit, search){
  let queryString = `?page=${page}&limit=${limit}`;
  if(search){
    queryString += `&search=${search}`;
  }
  return function(dispatch){
    
    axios.get(`${URL}/api/stock_items${queryString}`)
      .then((response) => {
        dispatch({ type: 'STOCK_ITEM_LIST', payload: response.data });
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err));
      });
  }
}

export function clearStockItemList(){
  return { type: 'CLEAR_STOCK_ITEM_LIST' };
}

export function getStockItemById(id, failure){
  return function(dispatch){
    axios.get(`${URL}/api/stock_items/${id}`)
      .then((response) => {
        dispatch({ type: 'SINGLE_STOCK_ITEM', payload: response.data });
      })
      .catch((error) => {
        let err = error.toString();
        if(err.includes('404')){
          err = '404. cannot find ingredient with that id';
        }
        dispatch(addMessageToContainer(err));
        failure();
      });
  }
}

export function clearSingleStockItem(){
  return { type: 'CLEAR_SINGLE_STOCK_ITEM' };
}

export function createStockItem(item, success){
  console.log('CSI item: ', item);
  return function(dispatch, getState){
    const { auth } = getState();
    axios.post(`${URL}/api/stock_items/`, item, { headers: {authorization: auth.token }})
      .then((response)=> {
        console.log('CSI response: ', response);
        dispatch({ type: 'NEW_STOCK_ITEM', payload: response.data });
        dispatch(addMessageToContainer('success creating item'));
        success();
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err));
      });
  }
}

export function clearNewStockItem(){
  return { type: 'CLEAR_NEW_STOCK_ITEM' };
}

export function deleteStockItem(id, success){
  return function(dispatch, getState){
    const { auth } = getState();
    axios.delete(`${URL}/api/stock_items/${id}`, { headers: {authorization: auth.token }})
      .then((response)=> {
        success();
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err));
      });
  }
}

export function editStockItem(id, item, success, failure){
  return function(dispatch, getState){
    const { auth } = getState();
    axios.put(`${URL}/api/stock_items/${id}`, item, { headers: {authorization: auth.token }})
      .then((response) => {
        success();
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err));
        failure();
      });
  }
}