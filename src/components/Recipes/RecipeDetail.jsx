import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { getRecipeById, clearSingleRecipe, deleteRecipe } from '../../actions/recipeActions';
import RecipeDetailDisplay from './RecipeDetailDisplay';

class RecipeDetail extends Component {
  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.getRecipeById(id, this.fetchErrorRedirect);
  }

  componentWillUnmount(){
    this.props.clearSingleRecipe();
  }

  fetchErrorRedirect = () => {
    this.props.history.push('/recipes')
  }

  renderIngredients = () => {
    const ingArray = this.props.recipe.ingredients;
    ingArray.sort((a,b) => {
      if(a.measure > b.measure){
        return -1;
      } 
      if(a.measure < b.measure) {
        return 1;
      }
      return 0
    });
    return ingArray.map((ingredient) => {
      return <tr key={ingredient.name}>
        <td>{ingredient.measure.toFixed(2)}</td>
        <td>{ingredient.unit}</td>
        <td>{ingredient.name}</td>
      </tr>
    })
  }

  deleteSuccess = () => {
    this.props.history.push('/recipes')
  }

  deleteItem = () => {
    const id = this.props.match.params.id;
    this.props.deleteRecipe(id, this.deleteSuccess);
  }

  render(){
    return (
      <RecipeDetailDisplay 
        recipe={ this.props.recipe }
        authenticated={ this.props.authenticated }
        renderIngredients={ this.renderIngredients }
        deleteItem={ this.deleteItem }
        { ...this.props }
      />
    );
  }
}

function mapStateToProps(state){
  return { recipe: state.recipe, authenticated: state.auth.authenticated }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getRecipeById, clearSingleRecipe, deleteRecipe }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);