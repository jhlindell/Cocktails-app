import axios from 'axios';
const URL = 'http://localhost:8000';

export function getRecipeList(page, limit, search){
  let queryString = `?page=${page}&limit=${limit}`;
  if(search){
    queryString += `&search=${search}`;
  }
  return function(dispatch){
    axios.get(`${URL}/api/recipes${queryString}`)
      .then((response) => {
        dispatch({ type: 'RECIPE_LIST', payload: response.data });
      })
      .catch((error) => {
        console.log('error getting recipes');
      });
  }
}

export function clearRecipeList(){
  return { type: 'CLEAR_RECIPE_LIST' };
}

export function getRecipeById(id, success, failure){
  return function(dispatch){
    axios.get(`${URL}/api/recipes/${id}`)
      .then((response) => {
        dispatch({ type: 'SINGLE_RECIPE', payload: response.data });
        success();
      })
      .catch((error) => {
        console.log('error getting recipe by id', error);
        failure(error);
      });
  }
}

export function clearSingleRecipe(){
  return { type: 'CLEAR_SINGLE_RECIPE' };
}

export function deleteRecipe(id, success, failure){
  return function(dispatch){
    axios.delete(`${URL}/api/recipes/${id}`)
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

export function createRecipe(recipe, success, failure){
  return function(dispatch){
    axios.post(`${URL}/api/recipes`, recipe)
      .then((response)=> {
        success();
      })
      .catch((error) => {
        //create error container to post error to
        console.log('error creating stock item', error);
        failure(error);
      });
  }
}

export function editRecipe(id, recipe, success, failure){
  return function(dispatch){
    axios.put(`${URL}/api/recipes/${id}`, recipe)
      .then((response) => {
        success();
      })
      .catch((error) => {
        //create error container to post error to
        console.log('error updating recipe', error);
        failure(error);
      });
  }
}

