import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { getStockItemById, clearSingleStockItem, deleteStockItem } from '../../actions/stockItemActions';
import { Button, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';

const stockItemStyle = {
  display: 'flex',
  margin: 'auto',
};

const buttonStyle = {
  margin: 'auto'
};

const cardStyle = {
  width: '60%',
  margin: 'auto'
}

class StockItemDetail extends Component{
  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.getStockItemById(id, this.fetchSuccess, this.fetchErrorRedirect);
  }

  componentWillUnmount(){
    this.props.clearSingleStockItem();
  }

  fetchErrorRedirect = () => {
    this.props.history.push('/stockitems')
  }

  fetchSuccess(){

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
      <div style={stockItemStyle}>
        { this.props.stockItem ? 
        <Card style={cardStyle}>
          <CardHeader>
            {this.props.stockItem.name}
          </CardHeader>
          <CardBody>
            <p>{this.props.stockItem.description}</p>            
          </CardBody>
          <CardFooter>
            <div className="btn-group" style={buttonStyle}>
              <Button
                color="primary"
                type="button"
                onClick={()=> this.props.history.push('/stockitems')}>
                Go Back
              </Button>
              <Button 
                color="warning"
                type="button"
                onClick={()=> this.props.history.push(`/stockitems/edit/${this.props.match.params.id}`)}>
                Edit
                </Button>
              <Button 
                color="danger" 
                type="button"
                onClick={()=> this.deleteItem()}>
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card> :
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