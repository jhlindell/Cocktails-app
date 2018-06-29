import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { createStockItem } from '../../actions/stockItemActions';
import StockItemForm from './StockItemForm';

class StockItemCreate extends Component{
  createSuccess = () => {
    this.props.history.push('/stockitems');
  }

  createStockItem = (item) => {
      const { name, description } = item;
      this.props.createStockItem({ name, description }, this.createSuccess);
  }

  cancel = () => {
    this.props.history.push('/stockitems');
  }

  render(){
    return (
      <StockItemForm
        handleFormSubmit={this.createStockItem}
        cancel={this.cancel}
        {...this.props}
      />     
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createStockItem }, dispatch);
}

export default connect(null, mapDispatchToProps)(StockItemCreate);