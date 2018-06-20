import axios from 'axios';
const URL = 'http://localhost:8000';

export function getStockItemList(page, limit){
  const query = `?page=${page}&limit=${limit}`
  return function(dispatch){
    axios.get(`${URL}/api/stock_items${query}`)
      .then((response) => {
        console.log(response)
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

export function getStockItemById(id, success, failure){
  return function(dispatch){
    axios.get(`${URL}/api/stock_items/${id}`)
      .then((response) => {
        dispatch({ type: 'SINGLE_STOCK_ITEM', payload: response.data });
        success();
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
  return function(dispatch){
    axios.post(`${URL}/api/stock_items/`, item)
      .then((response)=> {
        console.log("response", response);
        success();
      })
      .catch((error) => {
        //create error container to post error to
        console.log('error creating stock item', error);
        failure(error);
      });
  }
}

export function deleteStockItem(id, success, failure){
  return function(dispatch){
    axios.delete(`${URL}/api/stock_items/${id}`)
      .then((response)=> {
        console.log("delete response: ", response);
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
  return function(dispatch){
    axios.put(`${URL}/api/stock_items/${id}`, item)
      .then((response) => {
        console.log("edit success: ", response);
        success();
      })
      .catch((error) => {
        //create error container to post error to
        console.log('error updating stock item', error);
        failure(error);
      });
  }
}