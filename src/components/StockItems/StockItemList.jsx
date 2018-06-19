import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { getStockItemList, clearStockItemList } from '../../actions';
import { Link } from 'react-router-dom';
import { Button, Card, CardFooter, CardHeader, Table } from 'reactstrap';

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
      <Card style={listStyle}>
        <CardHeader>
          <strong>Ingredients</strong>    
        </CardHeader>
        
          { this.props.stockItemList ? 
            <Table striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.props.stockItemList.map((item) => {
                  const linkUrl = `/stockitems/${item._id}`;
                  return <tr key={item.name}>
                    <td><Link to={linkUrl}>{item.name}</Link></td>
                    <td>{item.description}</td>
                  </tr>
                })}
              </tbody>
            </Table> 
            : <span>loading...</span> }
        
        <CardFooter>
          <Button 
            color="primary"
            onClick={()=> this.props.history.push('/stockitems/create')}>Add Ingredient</Button>
        </CardFooter>
      </Card>
    );
  }
}

function mapStateToProps(state){
  return { stockItemList: state.stockItemList }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getStockItemList, clearStockItemList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StockItemList);