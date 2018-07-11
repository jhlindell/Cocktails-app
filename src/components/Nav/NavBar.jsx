import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const navBarStyle = {
  display: 'flex',
  height: '50px',
  width: '100%',
  backgroundColor: 'black',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  listStyle: 'none',
  padding: 0,
  margin: 0
};

const navText = {
  color: 'white',
  fontSize: '20px'
}

class NavBar extends Component {

  renderLinks = () => {
    return (this.props.authenticated) ?
      <li key={'signout'}>
        <span className="mr-3" style={navText}>{this.props.userName}</span>
        <Link style={navText}  to="/signout">Sign Out</Link>
      </li> :
      [
        <li key={'signin'}>
          <Link style={navText}  to="/signin">Sign In</Link>
        </li>,
        <li key={'signup'}>
          <Link style={navText} to="/signup">Sign Up</Link>
        </li>
      ];
  }
  render(){
    return (
      <ul style={navBarStyle}>
        <li key='recipes'>
          <Link to='/recipes' style={navText}>Recipes</Link>
        </li>
        <li key={'home'}>
          <Link to='/' style={navText}>BarCode</Link>
        </li>
        <li key='stockitems'>
          <Link to='/stockitems' style={navText}>Ingredients</Link>
        </li>
        {this.renderLinks()}
      </ul>
    );
  }
  
}

function mapStateToProps(state){
  return { authenticated: state.auth.authenticated,
    userName: state.userName };
}

export default connect(mapStateToProps, null)(NavBar);
