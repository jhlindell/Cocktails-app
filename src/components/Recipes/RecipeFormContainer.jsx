import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStockItem } from '../../actions/stockItemActions';
import RecipeFormDisplay from './RecipeFormDisplay';

class RecipeForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      options: [],
      modal: false,
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
        description: '',
        measure: '',
        ingredient: '',
        instruction: ''
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

  componentWillReceiveProps(nextProps){
    if(nextProps.newStockItem !== null){
      this.setState({ selected: [nextProps.newStockItem], newStockItem: null });
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const formValid = this.validateForm();
    if(formValid){
      const { name, description, ingredients, instructions } = this.state;
      this.props.handleFormSubmit({ name, description, ingredients, instructions });
    }
  }

  validateForm = () => {
    this.clearErrors();
    let isValid = true;
    let errors = {};
    if(this.state.name === ''){
      errors.name = 'Please enter a name for this drink.';
      isValid = false;
    }
    if(this.state.description === ''){
      errors.description = 'Please provide a description for this drink';
      isValid = false;
    }
    this.setState({errors});
    return isValid;
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  // functions for instructions

  addInstruction = () => {
    const instructionValid = this.validateInstruction();
    if(instructionValid){
      const insArray = this.state.instructions;
      insArray.push(this.state.newInstruction);
      this.setState({ instructions: insArray, newInstruction: ''});
    }
  }

  removeInstruction = (index) => {
    const insArray = this.state.instructions;
    insArray.splice(index, 1);
    this.setState({ instructions: insArray });
  }

  validateInstruction = () => {
    this.clearErrors();
    let errors = {};
    let isValid = true;
    if(this.state.newInstruction === ''){
      errors.instruction = 'Please enter instruction text.';
      isValid = false;
    }
    this.setState({errors}, () => console.log(this.state));
    return isValid;
  }

  // Functions for ingredients

  handleATAchange = (item) => {  
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

  addIngredient = () => {
    const ingredientValid = this.validateIngredient();
    if(ingredientValid){
      if(!this.state.selected){
        this.addIngToDB();
      } else {
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
        this.child.clearTypeahead();
      } 
    }
  }

  clearErrors = () => {
    this.setState({errors: {
      name: '',
      description: '',
      measure: '',
      ingredient: '',
      instruction: ''
    }});
  }

  validateIngredient = () => {
    this.clearErrors();
    let errors = {};
    let isValid = true;
    
    if(Number(this.state.newIngredientMeasure) <= 0) {
      errors.measure = 'Please enter a positive measure value';
      isValid = false;
    }

    if(this.state.newIngredientName === ''){
      errors.ingredient = 'Please pick an ingredient';
      isValid = false;
    }
    this.setState({ errors });
    return isValid;
  }

  removeIngredient = (index) => {
    const ingArray = this.state.ingredients;
    ingArray.splice(index, 1);
    this.setState({ ingredients: ingArray });
  }

  addIngToDB = () => {
    this.modalToggle();
  };

  modalToggle = () => {
    this.setState({ modal: !this.state.modal });
  }

  handleIngModalReturn = (stockItem) => {
    this.modalToggle();
    this.props.createStockItem(stockItem, ()=> {});
  }

  render(){
    return <RecipeFormDisplay 
      ref={ instance => { this.child = instance; }}
      state={ this.state }
      handleFormSubmit={ this.handleFormSubmit }
      handleInputChange={ this.handleInputChange }
      removeIngredient={ this.removeIngredient }
      onItemSearch={ this.onItemSearch }
      handleATAchange={ this.handleATAchange }
      handleATAInputChange={ this.handleATAInputChange }
      addIngredient={ this.addIngredient }
      addInstruction={ this.addInstruction }
      removeInstruction={ this.removeInstruction }
      cancel={ this.props.cancel }
      handleIngModalReturn={ this.handleIngModalReturn }
      modalToggle={ this.modalToggle }
    />
  }
}

function mapStateToProps(state){
  return { newStockItem: state.newStockItem };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createStockItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm);