import './App.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Nav/Footer';
import NavBar from './components/Nav/NavBar';
import React, { Component } from 'react';
import StockItemCreate from './components/StockItems/StockItemCreate';
import StockItemDetail from './components/StockItems/StockItemDetail';
import StockItemEdit from './components/StockItems/StockItemEdit';
import StockItemList from './components/StockItems/StockItemList';
import RecipeCreate from './components/Recipes/RecipeCreate';
import RecipeDetail from './components/Recipes/RecipeDetail';
import RecipeEdit from './components/Recipes/RecipeEdit';
import RecipeList from './components/Recipes/RecipeList';
import HomePage from './components/HomePage';


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
          <div style={flex1} id="mainBlock">
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/stockitems/edit/:id' component={StockItemEdit} />
              <Route exact path='/stockitems/create' component={StockItemCreate} />
              <Route exact path='/stockitems' component={StockItemList} />
              <Route path='/stockitems/:id' component={StockItemDetail} />

              <Route exact path='/recipes/edit/:id' component={RecipeEdit} />
              <Route exact path='/recipes/create' component={RecipeCreate} />
              <Route exact path='/recipes' component={RecipeList} />
              <Route path='/recipes/:id' component={RecipeDetail} />
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
