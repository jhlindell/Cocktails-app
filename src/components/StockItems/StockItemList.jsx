import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { getStockItemList, clearStockItemList } from '../../actions';

const listStyle = {
    display: 'flex',
    margin: 'auto'
}

class StockItemList extends Component {
  componentDidMount(){
    this.props.getStockItemList();
  }

  componentWillUnmount(){
    this.props.clearStockItemList();
  }

  render(){
    return (
      <div style={listStyle}>
        {this.props.stockItemList ? <ul className="list-group">
          {this.props.stockItemList.map((item) => {
            return <li 
            className="list-group-item" 
            key={item.name}
            onClick={()=> this.props.history.push(`/stockitems/${item._id}`)}
            >{item.name}</li>
          })}
        </ul> : <span>loading...</span>}
      </div>
    );
  }
}

function mapStateToProps(state){
  return { stockItemList: state.stockItemList }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getStockItemList, clearStockItemList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StockItemList);