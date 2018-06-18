import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { createStockItem } from '../../actions'

const cardStyle = {
  display: 'flex',
  margin: 'auto',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '80%',
  margin: 'auto'
};

class StockItemCreate extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: ''
    }
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.createStockItem(this.state);
    this.clearForm();
    //this.props.history.push('/stockitems');
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  clearForm = () => {
    this.setState({ name: '', description: ''});
  }

  render(){
    return(
      
        <form className="card" onSubmit={this.handleFormSubmit} style={cardStyle}>
            <div className="card-header">
              <h3>Add new ingredient</h3>
            </div>
            <div className="card-block mt-2">
              <div style={formStyle}> 
                <label>Name</label>
                <input name="name" type="text"
                  onChange={(e) => {this.handleInputChange(e)}}
                  placeholder="Name"
                  value={this.state.name}/>             
              </div>
              <div className="mt-2" style={formStyle}> 
                <label>Description</label>
                <input name="description" type="text"
                  onChange={(e) => {this.handleInputChange(e)}}
                  placeholder="Description"
                  value={this.state.description}/>             
              </div>
            </div>
            <div className="btn-group mb-2 mt-2" style={{padding: '0', margin: 'auto'}}>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              <button className="btn btn-secondary" type="button" onClick={()=>this.clearForm()}>
                Cancel
              </button>
            </div>
        </form>
      
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createStockItem }, dispatch);
}

export default connect(null, mapDispatchToProps)(StockItemCreate);