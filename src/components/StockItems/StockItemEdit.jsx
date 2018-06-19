import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { editStockItem, getStockItemById } from '../../actions'
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormGroup, Input, Label} from 'reactstrap';

const cardStyle = {
  display: 'flex',
  margin: 'auto',
};

class StockItemEdit extends Component{
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
    const id = this.props.match.params.id;
    this.props.getStockItemById(id, this.itemFetchSuccess, this.editFailure);
  }

  itemFetchSuccess = () => {
    this.setState({ name: this.props.stockItem.name, description: this.props.stockItem.description });
  }

  editSuccess = () => {
    this.props.history.push(`/stockitems/${this.props.match.params.id}`);
  }

  editFailure = () => {

  }

  handleFormSubmit = async(event) => {
    event.preventDefault();
    const valid = await this.validate();
    if(valid){
      const name = this.state.name;
      const description = this.state.description;
      this.props.editStockItem(this.props.match.params.id, { name, description }, this.editSuccess);
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  render(){
    return (
      <Card style={cardStyle}>
        <Form onSubmit={this.handleFormSubmit}>
          <CardHeader>
            Edit {this.state.name}
          </CardHeader>
          <CardBody>
              <FormGroup> 
                <Label for="itemName">Name</Label>
                <Input name="name" id="itemName"
                  type="text"
                  onChange={(e) => {this.handleInputChange(e)}}
                  placeholder="Name"
                  value={this.state.name}/> 
                <div>{this.state.errors.name}</div>            
              </FormGroup>
              <FormGroup> 
                <Label for="itemDescription">Description</Label>
                <Input name="description" id="itemDescription"
                  type="text"
                  onChange={(e) => {this.handleInputChange(e)}}
                  placeholder="Description"
                  value={this.state.description}/> 
                <div>{this.state.errors.description}</div>            
              </FormGroup>
            </CardBody>
            <CardFooter>
              <div className="btn-group" style={{ margin: 'auto' }}>
                <Button 
                  color="primary" 
                  type="submit">
                  Submit
                </Button>
                <Button 
                  color="secondary" 
                  type="button" 
                  onClick={()=>this.props.history.push(`/stockitems/${this.props.match.params.id}`)}>
                  Cancel
                </Button>
              </div>
            </CardFooter>
        </Form>
      </Card>
    )
  }

  validate(){
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

  clearErrors(){
    this.setState({ errors: {name: '',description: ''} });
  }

}

function mapStateToProps(state){
  return { stockItem: state.stockItem }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ editStockItem, getStockItemById }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StockItemEdit);