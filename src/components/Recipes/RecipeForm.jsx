import React, { Component } from 'react';
import { 
  Button, 
  Card, CardBody, CardFooter, CardHeader, 
  Col, 
  Form, 
  FormGroup, 
  Input, 
  Label,
  Table
} from 'reactstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';

const cardStyle = {
  display: 'flex',
  margin: 'auto',
  cardColumns: '1'
};

class RecipeForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      options: [],
      selected: null,
      newIngredientMeasure: '',
      newIngredientUnit: 'oz',
      newIngredientName: '',
      newInstruction: '',
      name: '',
      description: '',
      ingredients: [],
      instructions: [],
      errors: {
        name: '',
        description: ''
      }
    }
  }

  componentDidMount(){
    if(this.props.recipe){
      this.setState({ 
        name: this.props.recipe.name, 
        description: this.props.recipe.description,
        ingredients: this.props.recipe.ingredients,
        instructions: this.props.recipe.instructions
      })
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    // create validation for form 
    const { name, description, ingredients, instructions } = this.state;
    this.props.handleFormSubmit({ name, description, ingredients, instructions });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  addIngredient = () => {
    const ingArray = this.state.ingredients;
    const newIngredient = { 
      measure: this.state.newIngredientMeasure, 
      unit: this.state.newIngredientUnit, 
      name: this.state.newIngredientName,
    };
    if(this.state.selected && this.state.selected[0]._id){
      newIngredient._id = this.state.selected[0]._id;
    }
    ingArray.push(newIngredient);
    this.setState({ 
      ingredients: ingArray, 
      newIngredientMeasure: '', 
      newIngredientName: '',
      selected: null
    });
    this.typeahead.getInstance().clear()
  }

  removeIngredient = (index) => {
    const ingArray = this.state.ingredients;
    ingArray.splice(index, 1);
    this.setState({ ingredients: ingArray });
  }

  handleATAchange = (item) => {  
    console.log("ATA change. item: ", item);
    if(item.length){
      this.setState({ newIngredientName: item[0].name, selected: item });
    } else {
      this.setState({ newIngredientName: '', selected: null });
    }
  }

  handleATAInputChange = (input) => { 
    this.setState({ newIngredientName: input });
  }

  onItemSearch = (query) => {
    this.setState({isLoading: true});
    axios.get(`http://localhost:8000/api/stock_items?search${query}`)
      .then((response) => {
        this.setState({ options: response.data.docs, isLoading: false });
      })
      .catch((error) => {
        console.log('error getting stock items');
      });
  }

  addInstruction = () => {
    const insArray = this.state.instructions;
    insArray.push(this.state.newInstruction);
    this.setState({ instructions: insArray, newInstruction: ''});
  }

  removeInstruction = (index) => {
    const insArray = this.state.instructions;
    insArray.splice(index, 1);
    this.setState({ instructions: insArray });
  }

  renderIngredients = () => {
    return (
      <div>
        {this.state.ingredients.length ? <Table striped>
          <thead>
            <tr>
              <th>Measure</th>
              <th>Unit</th>
              <th>Ingredient Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.ingredients.map((ingredient, index) => {
              return <tr key={ingredient.name + ingredient.measure}>
                <td>{ingredient.measure}</td>
                <td>{ingredient.unit}</td>
                <td>{ingredient.name}</td>
                <td>
                  <Button 
                    color="danger"
                    type="button"
                    onClick={() => this.removeIngredient(index)}
                  >-</Button>
                </td>
              </tr>
            })}
          </tbody>
          </Table> : <div></div>}      
        <FormGroup row>
            <Col sm={2}>
              <Input name="newIngredientMeasure"
                id="newIngredientMeasure"
                type="text" 
                onChange={(e) => this.handleInputChange(e)}
                value={this.state.newIngredientMeasure} />
            </Col>
            <Col sm={2}>
              <Input name="newIngredientUnit"
                type="select" 
                id="newIngredientUnit"
                onChange={(e) => this.handleInputChange(e)}
                value={this.state.newIngredientUnit}>
                  <option>oz</option>
                  <option>tbsp</option>
                  <option>tsp</option>
                  <option>dash</option>
                  <option>drops</option>
                  <option>each</option>
                  <option>piece</option>
              </Input>
            </Col>
            <Col sm={6}>
              <AsyncTypeahead 
                name="newIngredientName"
                id="newIngredientName"
                isLoading={this.state.isLoading}
                labelKey="name"
                onSearch={query => this.onItemSearch(query)}
                onChange={(item) => this.handleATAchange(item)}
                onInputChange={(input) => this.handleATAInputChange(input)}
                selected={this.state.selected }
                value={this.state.newIngredientName}
                options={this.state.options}
                ref={(typeahead) => this.typeahead = typeahead} 
              />
            </Col>
            <Col sm={2}>
              <Button
                color="primary"
                type="button"
                onClick={()=> this.addIngredient()}>
                Add
              </Button>
            </Col>
          </FormGroup>       
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
              <Table>
                <tbody>
                  {this.state.instructions.map((instruction, index) => {
                    return <tr key={instruction}>
                      <td>{index + 1}</td>
                      <td>{instruction}</td>
                      <td>
                        <Button 
                          color="danger"
                          type="button"
                          onClick={() => this.removeInstruction(index)}
                        >-</Button>
                      </td>
                    </tr>
                  })}
                </tbody>
              </Table>
              <FormGroup row>
                <Col sm={9}>
                  <Input 
                    name='newInstruction' 
                    id='newInstruction'
                    type="text"
                    onChange={(e) => {this.handleInputChange(e)}}
                    value={this.state.newInstruction} />
                </Col>
                <Button sm={3}
                  color="primary"
                  type="button"
                  onClick={()=> this.addInstruction()}>
                  Add Instruction
                </Button>
              </FormGroup>
            </div>
          </CardBody>
          <CardFooter>
            <div className="btn-group" style={{ margin: 'auto' }}>
              <Button color="primary" type="submit">
                Submit
              </Button>
              <Button color="secondary" type="button" onClick={()=>this.props.cancel()}>
                Cancel
              </Button>
            </div>
          </CardFooter>
        </Form>
      </Card>
    );
  }
}

export default RecipeForm;