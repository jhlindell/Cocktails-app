import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { getStockItemList, clearStockItemList } from '../../actions/stockItemActions';
import StockItemListDisplay from './StockItemListDisplay';

class StockItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsPerPage: 20,
      searchBox: ''
    };
  }

  componentDidMount(){
    this.props.getStockItemList(this.state.activePage, this.state.itemsPerPage);
  }

  componentWillUnmount(){
    this.props.clearStockItemList();
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.props.getStockItemList(this.state.activePage, this.state.itemsPerPage, this.state.searchBox);
    });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSearchSubmit = (event) => {
    this.props.getStockItemList(this.state.activePage, this.state.itemsPerPage, this.state.searchBox)
  }

  render(){
    return (
      <StockItemListDisplay 
        state={ this.state }
        handlePageChange={ this.handlePageChange }
        handleInputChange={ this.handleInputChange }
        handleSearchSubmit={ this.handleSearchSubmit }
        stockItemList={ this.props.stockItemList }
        authenticated={ this.props.authenticated }
        { ...this.props }
      />
    );
  }
}

function mapStateToProps(state){
  return { stockItemList: state.stockItemList, authenticated: state.auth.authenticated }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getStockItemList, clearStockItemList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StockItemList);