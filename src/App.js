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
    this.getUsermame = this.getUsername.bind(this)
    this.setUsermame = this.setUsername.bind(this)
    this.authService = new AuthService();
    this.state = { loggedIn: this.authService.loggedIn(), username: this.getUsername(),
      rememberUsername: this.getRememberUsername(),
    };
  }

  render() {
    let profile;
    if(this.state.loggedIn) {
      profile = (
        <Profile
          onLogout={this.setLoginState}
          username={this.state.username}
          rememberUsername={this.state.rememberUsername}
        />
      )
    } else {
      profile = (
        <Login
          onAuthorize={this.setLoginState}
          username={this.state.username}
          rememberUsername={this.state.rememberUsername}
        />
      )
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

  setLoginState(props) {
    if(props.loggedIn) {
      this.setUsername(props.username, props.rememberUsername);
    } else {
      if(props.rememberUsername === false) {
        this.clearUsername();
      }
    }
    this.setState({loggedIn: props.loggedIn})
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getRememberUsername() {
    // ensure rememberUsername is returned as boolean
    return localStorage.getItem('rememberUsername') === 'true';
  }

  setUsername(username, rememberUsername) {
    localStorage.setItem('username', username);
    localStorage.setItem('rememberUsername', rememberUsername);
    this.setState({username, rememberUsername});
  }

  clearUsername(username) {
    localStorage.removeItem('username');
    this.setState({username});
  }
}

export default App;
