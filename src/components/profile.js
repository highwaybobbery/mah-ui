import React, { Component } from 'react';
import AuthenticationService from './authentication-service';
import './profile.css';

class Profile extends Component {
    constructor(props){
        super(props);
        this.onLogout = this.props.onLogout;
        this.authenticationService = new AuthenticationService();
        this.doLogout = this.doLogout.bind(this);
    }

    render() {
        return (
            <div id="profile">
                Signed in as {this.props.username}
                <button onClick={this.doLogout}>Log out</button>
            </div>
        )
    }

    doLogout() {
      this.authenticationService.logout();
      this.onLogout({loggedIn: false, rememberUsername: this.props.rememberUsername});
    }
}

export default Profile;

