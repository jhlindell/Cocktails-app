import React, { Component } from 'react';
import StockItemFormDisplay from './StockItemFormDisplay';

class StockItemForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      errors: {
        name: '',
        description: ''
      }
    }
  }

  componentDidMount(){
    if(this.props.stockItem){
      this.setState({ name: this.props.stockItem.name, description: this.props.stockItem.description })
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  clearErrors = () => {
    this.setState({ errors: {name: '', description: ''} });
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const valid = await this.validate();
    if(valid){
      const { name, description } = this.state;
      this.props.handleFormSubmit({ name, description });
    }
  }

  validate = () =>{
    this.clearErrors();
    let errors = {};
    let isValid = true;

    if(this.state.name === '') {
      errors.name = 'Please enter a name';
      isValid = false;
    }

    else if(this.state.name.length < 2 || this.state.name > 100){
      errors.name = 'Name needs to be between 10 and 100 characters';
      isValid = false;
    }

    if(this.state.description === '') {
      errors.description = 'Please enter a description';
      isValid = false;
    }

    else if(this.state.description.length < 2 || this.state.description > 500){
      errors.description = 'Name needs to be between 10 and 500 characters';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  }

  render(){
    return (
      <StockItemFormDisplay 
        state={ this.state }
        inputChange={ this.handleInputChange }
        formSubmit={ this.handleFormSubmit }
        cancel={ this.props.cancel }
      />
    )
  }
};

export default StockItemForm;
