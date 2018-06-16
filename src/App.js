import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Nav/Footer';
import NavBar from './components/Nav/NavBar';
import React, { Component } from 'react';
import StockItemCreate from './components/StockItems/StockItemCreate';
import StockItemDetail from './components/StockItems/StockItemDetail';
import StockItemList from './components/StockItems/StockItemList';


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
              <Route exact path='/stockitems/create' component={StockItemCreate} />
              <Route exact path='/stockitems' component={StockItemList} />
              <Route path='/stockitems/:id' component={StockItemDetail} />
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
