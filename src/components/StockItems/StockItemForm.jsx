import React, { Component } from 'react';
import { Button, CardBody, CardFooter, CardHeader, Form, FormGroup, Input, Label} from 'reactstrap';

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
      <Form onSubmit={this.handleFormSubmit}>
          <CardHeader>
            <h3>Add new ingredient</h3>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label for="itemName">Name</Label>
              <Input name="name" id="itemName"
                className={"" + this.state.errors.name ? "is-invalid": ""}
                type="text"
                onChange={(e) => {this.handleInputChange(e)}}
                placeholder="Name"
                value={this.state.name}/>
              {this.state.errors.name && <div>{this.state.errors.name}</div>}
            </FormGroup>
            <FormGroup>
              <Label for="itemDescription">Description</Label>
              <Input name="description" id="itemDescription"
                className={"" + this.state.errors.description ? "is-invalid": ""}
                type="text"
                onChange={(e) => {this.handleInputChange(e)}}
                placeholder="Description"
                value={this.state.description}/>
              {this.state.errors.description && <div>{this.state.errors.description}</div>}
            </FormGroup>
          </CardBody>
          <CardFooter>
            <div className="btn-group" >
              <Button color="primary" type="submit">
                Submit
              </Button>
              <Button color="secondary" type="button" onClick={()=>this.props.cancel()}>
                Cancel
              </Button>
            </div>
          </CardFooter>
      </Form>
    )
  }
};

export default StockItemForm;
