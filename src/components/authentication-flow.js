import React, { Component } from 'react';
import Login from './login'
import Profile from './profile'
import AuthenticationService from './authentication-service';

class AuthenticationFlow extends Component {
  constructor(props) {
    super(props)
    this.authenticationService = new AuthenticationService();

    this.setLoginState = this.setLoginState.bind(this)
    this.getUsername = this.getUsername.bind(this)
    this.setUsername = this.setUsername.bind(this)

    this.onLoginChange = props.onLoginChange ? props.onLoginChange : () => {};

    this.state = { loggedIn: this.authenticationService.loggedIn(), username: this.getUsername(),
      rememberUsername: this.getRememberUsername(),
    };

    // notify parent that we have a login state
    this.onLoginChange(this.state.loggedIn);
  }

  render() {
    if(this.state.loggedIn) {
      return (
        <Profile
          onLogout={this.setLoginState}
          username={this.state.username}
          rememberUsername={this.state.rememberUsername}
        />
      )
    } else {
      return (
        <Login
          onLogin={this.setLoginState}
          username={this.state.username}
          rememberUsername={this.state.rememberUsername}
        />
      )
    }
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
export default AuthenticationFlow
