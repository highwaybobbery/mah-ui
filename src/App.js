import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login'
import Profile from './components/profile'
import AuthService from './components/auth-service';

class App extends Component {
  constructor(props) {
    super(props)
    this.setLoginState = this.setLoginState.bind(this)
    this.authService = new AuthService();
    this.state = { loggedIn: this.authService.loggedIn() };
  }

  render() {
    console.log('App.render');
    console.log(this.state);
    let profile;
    if(this.state.loggedIn) {
      profile = <Profile onLogout={this.setLoginState} />;
    } else {
      profile = <Login onAuthorize={this.setLoginState} />;
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Mah Applicationz.</h1>
        </header>
        <p className="App-intro">
          It will be awesome.
        </p>
        {profile}
      </div>
    );
  }

  setLoginState(loggedIn) {
    this.setState({loggedIn});
  }
}

export default App;
