import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import { getStockItemList, clearStockItemList } from '../../actions/stockItemActions';
import { Link } from 'react-router-dom';
import { Button, Card, CardFooter, CardHeader, Table } from 'reactstrap';
import Pagination from "react-js-pagination";

const listStyle = {
    display: 'flex',
    margin: 'auto',
    marginTop: '20px',
    marginBottom: '20px'
};

const headerStyle = {
  display: 'flex', 
  margin: 'auto', 
  justifyContent: 'space-around',
  alignItems: 'center'
};

class StockItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsPerPage: 20
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
      this.props.getStockItemList(this.state.activePage, this.state.itemsPerPage);
    });
  }

  render(){
    return (
      <Card style={listStyle}>
        <CardHeader>
          <div style={headerStyle}>
          <strong>Ingredients</strong>
            <Button 
              color="primary"
              onClick={()=> this.props.history.push('/stockitems/create')}>
              Add Ingredient
            </Button>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.itemsPerPage}
              totalItemsCount={this.props.stockItemList.total}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              itemClass='page-item'
              linkClass='page-link'
            />
          </div>   
        </CardHeader>    
          { this.props.stockItemList.docs ? 
            <Table striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.props.stockItemList.docs.map((item) => {
                  const linkUrl = `/stockitems/${item._id}`;
                  let desc = item.description;
                  if(item.description.length > 80){
                    desc = item.description.slice(0, 79) + '...';
                  }
                  return <tr key={item._id}>
                    <td><Link to={linkUrl}>{item.name}</Link></td>
                    <td>{desc}</td>
                  </tr>
                })}
              </tbody>
            </Table> 
            : <span>loading...</span> }       
        <CardFooter>
          <div style={headerStyle}>
            <Button 
              color="primary"
              onClick={()=> this.props.history.push('/stockitems/create')}>
              Add Ingredient
            </Button>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.itemsPerPage}
              totalItemsCount={this.props.stockItemList.total}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              itemClass='page-item'
              linkClass='page-link'
            />
          </div>
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