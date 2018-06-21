import React, { Component } from 'react';
import { 
  Button, 
  Card, CardBody, CardFooter, CardHeader, 
  Col, 
  Form, 
  FormGroup, 
  Input, 
  Label,
} from 'reactstrap';


const cardStyle = {
  display: 'flex',
  margin: 'auto',
  width: '70%'
};

class RecipeCreate extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      ingredients: [
        {
          measure: '',
          unit: 'oz',
          ingredient: ''
        }
      ],
      instructions: [''],
      errors: {
        name: '',
        description: ''
      }
    }
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    // const valid = await this.validate();
    // if(valid){
      const name = this.state.name;
      const description = this.state.description;
      const ingredients = this.state.ingredients;
      const instructions = this.state.instructions;
      // this.props.createRecipe({ name, description, ingredients, instructions }, this.createSuccess);
      console.log("recipe: ", { name, description, ingredients, instructions });
    // }
  }

  createSuccess = () => {
    this.props.history.push('/recipes');
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleIngredientChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const index = Number(target.dataset.index);
    const ingArray = this.state.ingredients;
    ingArray[index][name] = value;
    this.setState({ ingredients: ingArray});
  }

  addIngredient = () => {
    const ingArray = this.state.ingredients;
    ingArray.push({measure: '', unit: 'oz', ingredient: '' });
    this.setState({ ingredients: ingArray});
  }

  renderIngredients = () => {
    return (
      <div>
        <FormGroup row>
          <Col sm={2}>Measure</Col>
          <Col sm={2}>Unit</Col>
          <Col sm={8}>Ingredient</Col>
        </FormGroup>
        {this.state.ingredients.map((ingredient, index) => {
          return <FormGroup key={index} row>
            <Col sm={2}>
              <Input name="measure"
                id={`measure${index}`}
                data-index={index}
                type="text" 
                onChange={(e) => this.handleIngredientChange(e)}
                value={this.state.ingredients[index].measure} />
            </Col>
            <Col sm={2}>
            <Input name="unit"
              type="select" 
              id={`unit${index}`}
              data-index={index}
              onChange={(e) => this.handleIngredientChange(e)}
              value={this.state.ingredients[index].unit}>
                <option>oz</option>
                <option>tbsp</option>
                <option>tsp</option>
                <option>dash</option>
                <option>drops</option>
                <option>each</option>
                <option>piece</option>
          </Input>
            </Col>
            <Col sm={8}>
              <Input name="ingredient"
                id={`ingredient${index}`}
                data-index={index}
                type="text"
                onChange={(e, index) => {this.handleIngredientChange(e, index)}}
                value={this.state.ingredients[index].ingredient} />
            </Col>
          </FormGroup>
        })}
        <Button
          color="primary"
          type="button"
          onClick={()=> this.addIngredient()}>
          Add Ingredient
        </Button>
      </div>
    );
  };

  handleInstructionChange = (event) => {
    const target = event.target;
    const value = target.value;
    const index = Number(target.name);
    const insArray = this.state.instructions;
    insArray[index] = value;
    this.setState({ instructions: insArray});
  }

  addInstruction = () => {
    const insArray = this.state.instructions;
    insArray.push('');
    this.setState({ instructions: insArray});
  }

  renderInstructions = () => {
    return (
      <div>
        {this.state.instructions.map((instruction, index) => {
          return <FormGroup key={index} row>
          <Label for={`instruction${index}`} sm={2}>{index + 1}</Label>
          <Col sm={10}>
            <Input name={index} 
              id={`instruction${index}`}
              type="text"
              onChange={(e, index) => {this.handleInstructionChange(e, index)}}
              value={this.state.instructions[index]} />
          </Col>
        </FormGroup>
        })}
        <Button
          color="primary"
          type="button"
          onClick={()=> this.addInstruction()}>
          Add Instruction
        </Button>
      </div>
    );
  };
  
  render(){
    return (
      <Card style={cardStyle}>
        <Form onSubmit={this.handleFormSubmit}>
          <CardHeader>
            New Recipe
          </CardHeader>
          <CardBody>
            <FormGroup row>
              <Label for="recipeName" sm={3}>Name</Label>
              <Col sm={9}>
                <Input name="name" id="recipeName"
                  className={"" + this.state.errors.name ? "is-invalid": ""}
                  type="text"
                  onChange={(e) => {this.handleInputChange(e)}}
                  placeholder="Recipe Name"
                  value={this.state.name}/>            
                {this.state.errors.name && <div>{this.state.errors.name}</div> }
              </Col>
            </FormGroup>
            <FormGroup row> 
              <Label for="recipeDescription" sm={3}>Description</Label>
              <Col sm={9}>
                <Input name="description" id="recipeDescription"
                  className={"" + this.state.errors.description ? "is-invalid": ""}
                  type="text"
                  onChange={(e) => {this.handleInputChange(e)}}
                  placeholder="Description"
                  value={this.state.description}/>  
                {this.state.errors.description && <div>{this.state.errors.description}</div> }
              </Col>     
            </FormGroup>
            <div>
              <p>Ingredients:</p>
              {this.renderIngredients()}
            </div>
            <div className="mt-3">
              <p>Instructions:</p>
              {this.renderInstructions()}
            </div>
          </CardBody>
          <CardFooter>
            <div className="btn-group" style={{ margin: 'auto' }}>
              <Button color="primary" type="submit">
                Submit
              </Button>
              <Button color="secondary" type="button" onClick={()=>this.props.history.push('/recipes')}>
                Cancel
              </Button>
            </div>
          </CardFooter>
        </Form>
      </Card>
    );
  }
}

export default RecipeCreate;