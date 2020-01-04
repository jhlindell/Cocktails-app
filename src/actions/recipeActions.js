import axios from 'axios';
import { addMessageToContainer } from './index';
const URL = process.env.REACT_APP_SERVER_URL;

export function getRecipeList(page, limit, search) {
  let queryString = `?page=${page}&limit=${limit}`;
  if (search) {
    queryString += `&search=${search}`;
  }
  return function (dispatch) {
    axios.get(`${URL}/api/recipes${queryString}`)
      .then((response) => {
        dispatch({ type: 'RECIPE_LIST', payload: response.data });
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err));
      });
  }
}

export function clearRecipeList() {
  return { type: 'CLEAR_RECIPE_LIST' };
}

export function getRecipeById(id, failure) {
  return function (dispatch) {
    axios.get(`${URL}/api/recipes/${id}`)
      .then((response) => {
        dispatch({ type: 'SINGLE_RECIPE', payload: response.data });
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err));
        failure(error);
      });
  }
}

export function clearSingleRecipe() {
  return { type: 'CLEAR_SINGLE_RECIPE' };
}

export function deleteRecipe(id, success) {
  return function (dispatch, getState) {
    const { auth } = getState();
    axios.delete(`${URL}/api/recipes/${id}`, { headers: { authorization: auth.token } })
      .then((response) => {
        success();
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err));
      });
  }
}

export function createRecipe(recipe, success) {
  return function (dispatch, getState) {
    const { auth } = getState();
    axios.post(`${URL}/api/recipes`, recipe, { headers: { authorization: auth.token } })
      .then((response) => {
        success();
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err));
      });
  }
}

export function editRecipe(id, recipe, success) {
  return function (dispatch, getState) {
    const { auth } = getState();
    axios.put(`${URL}/api/recipes/${id}`, recipe, { headers: { authorization: auth.token } })
      .then((response) => {
        success();
      })
      .catch((error) => {
        let err = error.toString();
        dispatch(addMessageToContainer(err));
      });
  }
}

