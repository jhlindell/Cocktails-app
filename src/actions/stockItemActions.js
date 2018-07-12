import axios from 'axios';
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
        console.log('error getting stock items');
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
        console.log('error getting stock item by id', error);
        failure(error);
      });
  }
}

export function clearSingleStockItem(){
  return { type: 'CLEAR_SINGLE_STOCK_ITEM' };
}

export function createStockItem(item, success, failure){
  return function(dispatch, getState){
    const { auth } = getState();
    axios.post(`${URL}/api/stock_items/`, item, { headers: {authorization: auth.token }})
      .then((response)=> {
        console.log("create stock item action response: ", response.data)
        dispatch({ type: 'NEW_STOCK_ITEM', payload: response.data });
        success();
      })
      .catch((error) => {
        //create error container to post error to
        console.log('error creating stock item', error);
        failure(error);
      });
  }
}

export function clearNewStockItem(){
  return { type: 'CLEAR_NEW_STOCK_ITEM' };
}

export function deleteStockItem(id, success, failure){
  return function(dispatch, getState){
    const { auth } = getState();
    axios.delete(`${URL}/api/stock_items/${id}`, { headers: {authorization: auth.token }})
      .then((response)=> {
        success();
      })
      .catch((error) => {
        //create error container to post error to
        console.log('error deleting stock item', error);
        failure(error);
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
        //create error container to post error to
        console.log('error updating stock item', error);
        failure(error);
      });
  }
}