import './App.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Nav/Footer';
import NavBar from './components/Nav/NavBar';
import React, { Component } from 'react';

import Signup from './components/auth/SignupContainer';
import Signin from './components/auth/SigninContainer';
import Signout from './components/auth/Signout';

import StockItemCreate from './components/StockItems/StockItemCreate';
import StockItemDetail from './components/StockItems/StockItemDetailContainer';
import StockItemEdit from './components/StockItems/StockItemEdit';
import StockItemList from './components/StockItems/StockItemListContainer';

import RecipeCreate from './components/Recipes/RecipeCreate';
import RecipeDetail from './components/Recipes/RecipeDetail';
import RecipeEdit from './components/Recipes/RecipeEdit';
import RecipeList from './components/Recipes/RecipeListContainer';

import HomePage from './components/HomePage';
import requireAuth from './components/auth/require_authentication';

import MessageContainer from './components/MessageContainer';

class App extends Component {
  render() {
    const flexCol = {
      display: 'flex',
      flexDirection: 'column',
    };

    const flex0 = {
      flex: 0
    };

    const flex1 = {
      display: 'flex',
      flex: '1 1 100%',
    };
    return (
      <Router>
        <div className="App" style={flexCol}>
          <div style={flex0}>
            <NavBar />
          </div>
          <div style={flex0}>
            <MessageContainer />
          </div>
          <div style={flex1} id="mainBlock">
            <Switch>
              <Route path='/signup' component={Signup} />
              <Route path='/signin' component={Signin} />
              <Route path='/signout' component={Signout} />

              <Route exact path='/stockitems/edit/:id' component={requireAuth(StockItemEdit)} />
              <Route exact path='/stockitems/create' component={requireAuth(StockItemCreate)} />
              <Route exact path='/stockitems' component={StockItemList} />
              <Route path='/stockitems/:id' component={StockItemDetail} />
              
              <Route exact path='/recipes/edit/:id' component={requireAuth(RecipeEdit)} />
              <Route exact path='/recipes/create' component={requireAuth(RecipeCreate)} />
              <Route exact path='/recipes' component={RecipeList} />
              <Route path='/recipes/:id' component={RecipeDetail} />

              <Route exact path='/' component={HomePage} />
            </Switch>
          </div>
          <div style={flex0}>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
