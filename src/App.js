import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login'
import Profile from './components/profile'
import AuthenticationFlow from './components/authentication-flow';

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Mah Applicationz.</h1>
        </header>
        <AuthenticationFlow />
        <p className="App-intro">
          It will be awesome.
        </p>
      </div>
    );
  }

}

export default App;
