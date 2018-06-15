import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


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
            <h1>What's up Ninja?</h1>
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
