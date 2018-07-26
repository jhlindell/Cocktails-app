import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { getStockItemById, clearSingleStockItem, deleteStockItem } from '../../actions/stockItemActions';
import StockItemDetailDisplay from './StockItemDetailDisplay';

class StockItemDetail extends Component{
  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.getStockItemById(id, this.fetchErrorRedirect);
  }

  componentWillUnmount(){
    this.props.clearSingleStockItem();
  }

  fetchErrorRedirect = () => {
    this.props.history.push('/stockitems')
  }

  deleteSuccess = () => {
    this.props.history.push('/stockitems')
  }

  deleteItem = () => {
    const id = this.props.match.params.id;
    this.props.deleteStockItem(id, this.deleteSuccess);
  }

  render(){
    return (
      <StockItemDetailDisplay 
        deleteItem={ this.deleteItem }
        stockItem={ this.props.stockItem }
        authenticated={ this.props.authenticated }
        { ...this.props }
      />
    );
  }
}

function mapStateToProps(state){
  return { stockItem: state.stockItem, authenticated: state.auth.authenticated }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getStockItemById, clearSingleStockItem, deleteStockItem }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StockItemDetail);