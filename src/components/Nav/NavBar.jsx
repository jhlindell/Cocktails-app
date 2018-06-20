import React from "react";
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

const NavBar = () => (
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
  </ul>
);

export default NavBar;
