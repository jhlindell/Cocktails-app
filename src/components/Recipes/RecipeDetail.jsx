import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { getRecipeById, clearSingleRecipe, deleteRecipe } from '../../actions/recipeActions';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';

const outerDivStyle = {
  display: 'flex',
  margin: 'auto',
};

const buttonStyle = {
  margin: 'auto'
};

const cardStyle = {
  margin: 'auto',
  cardColumns: '1'
}

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
      <div style={outerDivStyle}>
        { this.props.recipe ? 
        <Card style={cardStyle}>
          <CardHeader>
            {this.props.recipe.name}
          </CardHeader>
          <CardBody>
            <p><strong>Description:</strong></p>
            <p>{this.props.recipe.description}</p>
            <p><strong>Ingredients:</strong></p>
            <Table>
              <thead>
                <tr>
                  <th>measure:</th>
                  <th>unit:</th>
                  <th>name:</th>
                </tr>
              </thead>
              <tbody>
                {this.props.recipe ? this.renderIngredients(): <span>Loading...</span>}   
              </tbody>   
            </Table>
            <p><strong>Instructions:</strong></p>
            <ol>
              {this.props.recipe.instructions.map((instruction) => {
                return <li key={instruction}>{instruction}</li>
              })}
            </ol>
          </CardBody>
          <CardFooter>
            <div className="btn-group" style={buttonStyle}>
              <Button
                color="primary"
                type="button"
                onClick={()=> this.props.history.push('/recipes')}>
                Go Back
              </Button>
              {this.props.authenticated &&<Button 
                color="warning"
                type="button"
                onClick={()=> this.props.history.push(`/recipes/edit/${this.props.match.params.id}`)}>
                Edit
                </Button>}
              {this.props.authenticated && <Button 
                color="danger" 
                type="button"
                onClick={()=> this.deleteItem()}>
                Delete
              </Button>}
            </div>
          </CardFooter>
        </Card> :
        <div>Loading...</div>}
      </div>
    )
  }
}

function mapStateToProps(state){
  return { recipe: state.recipe, authenticated: state.auth.authenticated }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getRecipeById, clearSingleRecipe, deleteRecipe }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);