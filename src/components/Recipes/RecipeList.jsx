import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRecipeList, clearRecipeList } from '../../actions/recipeActions';
import { Button, Card, CardFooter, CardHeader, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";

const listStyle = {
  display: 'flex',
  margin: 'auto',
  marginTop: '20px',
  marginBottom: '20px'
};

const footerStyle = {
display: 'flex', 
margin: 'auto', 
justifyContent: 'space-around'
};

class RecipeList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsPerPage: 20
    };
  }

  componentDidMount(){
    this.props.getRecipeList(this.state.activePage, this.state.itemsPerPage);
  }

  componentWillUnmount(){
    this.props.clearRecipeList();
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.props.getRecipeList(this.state.activePage, this.state.itemsPerPage);
    });
  }

  render(){
    return (
      <Card style={listStyle}>
        <CardHeader>
          <strong>Recipes</strong>    
        </CardHeader>      
          { this.props.recipeList.docs ? 
            <Table striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.props.recipeList.docs.map((recipe) => {
                  const linkUrl = `/recipes/${recipe._id}`;
                  let desc = recipe.description;
                  if(recipe.description.length > 80){
                    desc = recipe.description.slice(0, 79) + '...';
                  }
                  return <tr key={recipe._id}>
                    <td><Link to={linkUrl}>{recipe.name}</Link></td>
                    <td>{desc}</td>
                  </tr>
                })}
              </tbody>
            </Table> 
            : <span>loading...</span> }       
        <CardFooter>
          <div style={footerStyle}>
            <Button 
              color="primary"
              onClick={()=> this.props.history.push('/recipes/create')}>
              New Recipe
            </Button>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.itemsPerPage}
              totalItemsCount={this.props.recipeList.total}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              itemClass='page-item'
              linkClass='page-link'
            />
          </div>
        </CardFooter>
      </Card>
    )
  }
}

function mapStateToProps(state){
  return { recipeList: state.recipeList }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getRecipeList, clearRecipeList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);