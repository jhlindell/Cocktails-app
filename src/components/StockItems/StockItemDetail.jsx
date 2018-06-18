import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { getStockItemById, clearSingleStockItem, deleteStockItem } from '../../actions';

const stockItemStyle = {
  display: 'flex',
  margin: 'auto',
};

const buttonStyle = {
  margin: 'auto'
};

const cardStyle = {
  padding: '10px'
};

class StockItemDetail extends Component{
  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.getStockItemById(id);
  }

  componentWillUnmount(){
    this.props.clearSingleStockItem();
  }

  deleteItem(){
    const id = this.props.match.params.id;
    this.props.deleteStockItem(id);
    //this.props.history.push('/stockitems')
  }

  render(){
    return (
      <div style={stockItemStyle}>
        { this.props.stockItem ? 
        <div className="card" style={cardStyle}>
          <p>Name:  {this.props.stockItem.name}</p>
          <p>Description:  {this.props.stockItem.description}</p>
          <div style={buttonStyle}>
            <button 
              className="btn btn-danger" 
              type="button"
              onClick={()=> this.deleteItem()}>
              Delete
            </button>
          </div>
        </div> :
        <div>Loading...</div>}
      </div>
    );
  }
}

function mapStateToProps(state){
  return { stockItem: state.stockItem }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getStockItemById, clearSingleStockItem, deleteStockItem }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StockItemDetail);