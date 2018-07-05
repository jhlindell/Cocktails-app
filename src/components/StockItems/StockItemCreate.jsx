import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { createStockItem } from '../../actions/stockItemActions';
import { Card } from 'reactstrap';
import StockItemForm from './StockItemForm';

const cardStyle = {
  display: 'flex',
  margin: 'auto',
  cardColumns: '1'
};

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
      <Card style={cardStyle}>
        <StockItemForm
          handleFormSubmit={this.createStockItem}
          cancel={this.cancel}
          {...this.props}
        />   
      </Card>  
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createStockItem }, dispatch);
}

export default connect(null, mapDispatchToProps)(StockItemCreate);