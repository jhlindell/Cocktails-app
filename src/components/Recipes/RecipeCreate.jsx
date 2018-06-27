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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createRecipe } from '../../actions/recipeActions';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';


const cardStyle = {
  display: 'flex',
  margin: 'auto',
  width: '70%'
};

class RecipeCreate extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      options: [],
      name: '',
      description: '',
      ingredients: [
        {
          measure: '',
          unit: 'oz',
          name: null,
          selected: null
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
      this.props.createRecipe({ name, description, ingredients, instructions }, this.createSuccess, this.createFailure);
      console.log("recipe: ", { name, description, ingredients, instructions });
    // }
  }

  createSuccess = () => {
    this.props.history.push('/recipes');
  }

  createFailure = (error) => {
    console.log(error)
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
    ingArray.push({measure: '', unit: 'oz', name: '' });
    this.setState({ ingredients: ingArray});
  }

  handleATAchange = (item, index) => {  
    const ind = index.index;  
    const ingArray = this.state.ingredients;
    if(item.length){
      ingArray[ind].name = item[0].name;
      ingArray[ind].selected = item;
      ingArray[ind]._id = item[0]._id;
      this.setState({ingredients: ingArray});
    } else {
      ingArray[ind].name = '';
      ingArray[ind].selected = null;
      ingArray[ind]._id = null;
      this.setState({ingredients: ingArray});
    }
  }

  handleATAInputChange = (input, index) => {
    const ind = index.index;  
    const ingArray = this.state.ingredients;
    ingArray[ind].name = input;
    this.setState({ ingredients: ingArray });
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

  renderIngredients = () => {
    return (
      <div>
        <FormGroup row>
          <Col sm={2}>Measure</Col>
          <Col sm={2}>Unit</Col>
          <Col sm={8}>Ingredient Name</Col>
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
              {/* <Input name="name"
                id={`ingredient${index}`}
                data-index={index}
                type="text"
                onChange={(e, index) => {this.handleIngredientChange(e, index)}}
                value={this.state.ingredients[index].name} /> */}
              <AsyncTypeahead 
                name="name"
                id={`ingredient${index}`}
                isLoading={this.state.isLoading}
                data-index={index}
                labelKey="name"
                onSearch={query => this.onItemSearch(query)}
                onChange={(item) => this.handleATAchange(item, {index})}
                onInputChange={(input) => this.handleATAInputChange(input, {index})}
                selected={this.state.ingredients[index].selected }
                options={this.state.options}/>
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

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createRecipe }, dispatch);
}

export default connect(null, mapDispatchToProps)(RecipeCreate);