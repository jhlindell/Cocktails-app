import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createRecipe } from '../../actions/recipeActions';
import RecipeForm from './RecipeFormContainer';

class RecipeCreate extends Component {
  createRecipe = (recipe) => {
    const { name, description, ingredients, instructions } = recipe;
    this.props.createRecipe({ name, description, ingredients, instructions }, this.createSuccess);
  }

  createSuccess = () => {
    this.props.history.push('/recipes');
  }

  cancel = () => {
    this.props.history.push('/recipes');
  }

  render(){
    return (
      <RecipeForm 
        handleFormSubmit = {this.createRecipe}
        cancel = {this.cancel}
        {...this.props}
      />
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createRecipe }, dispatch);
}

export default connect(null, mapDispatchToProps)(RecipeCreate);