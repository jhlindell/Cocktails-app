import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getRecipeById, editRecipe } from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';


class RecipeEdit extends Component{
  editRecipe = (recipe) => {
    const { name, description, ingredients, instructions } = recipe;
    this.props.editRecipe(this.props.match.params.id, 
      { name, description, ingredients, instructions }, 
      this.editSuccess, 
      this.editFailure);
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.getRecipeById(id, this.editFailure);
  }

  editSuccess = () => {
    this.props.history.push(`/recipes/${this.props.match.params.id}`);
  }

  editFailure = (error) => {
    alert(error);
  }

  cancel = () => {
    this.props.history.push('/recipes');
  }

  render(){
    return (
      <RecipeForm 
        handleFormSubmit = {this.editRecipe}
        cancel = {this.cancel}
        recipe = {this.props.recipe}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state){
  return { recipe: state.recipe };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getRecipeById, editRecipe }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEdit);