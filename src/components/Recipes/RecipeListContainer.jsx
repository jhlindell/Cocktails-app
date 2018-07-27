import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRecipeList, clearRecipeList } from '../../actions/recipeActions';
import RecipeListDisplay from './RecipeListDisplay';

class RecipeList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsPerPage: 20,
      searchBox: ''
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
      this.props.getRecipeList(this.state.activePage, this.state.itemsPerPage, this.state.searchBox);
    });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSearchSubmit = (event) => {
    this.props.getRecipeList(1, this.state.itemsPerPage, this.state.searchBox);
    this.setState({ activePage: 1 });
  }

  render(){
    return (
      <RecipeListDisplay
        recipeList={ this.props.recipeList }
        authenticated={ this.props.authenticated }
        state={ this.state }
        handlePageChange={ this.handlePageChange }
        handleInputChange={ this.handleInputChange }
        handleSearchSubmit={ this.handleSearchSubmit }
        { ...this.props }
      />
    );
  }
}

function mapStateToProps(state){
  return { recipeList: state.recipeList, authenticated: state.auth.authenticated }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getRecipeList, clearRecipeList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);