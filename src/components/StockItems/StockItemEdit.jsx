import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { editStockItem, getStockItemById } from '../../actions/stockItemActions'
import StockItemForm from './StockItemForm';

class StockItemEdit extends Component{
  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.getStockItemById(id, this.editFailure);
  }

  editSuccess = () => {
    this.props.history.push(`/stockitems/${this.props.match.params.id}`);
  }

  editFailure = (error) => {
    this.props.history.push(`/stockitems/${this.props.match.params.id}`);
  }

  editStockItem = (item) => {
    const { name, description } = item;
    this.props.editStockItem(this.props.match.params.id, { name, description }, this.editSuccess);
  }

  cancel = () => {
    this.props.history.push(`/stockitems/${this.props.match.params.id}`);
  }

  render(){
    return (
      <StockItemForm 
        handleFormSubmit={this.editStockItem}
        stockItem={this.props.stockItem}
        cancel={this.cancel}
        {...this.props}
      />
    );
  }

}

function mapStateToProps(state){
  return { stockItem: state.stockItem }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ editStockItem, getStockItemById }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StockItemEdit);