import React, { Component } from 'react';
import AuthService from './auth-service';

class Profile extends Component {
    constructor(props){
        super(props);
        this.onLogout = this.props.onLogout;
        this.authService = new AuthService();
        this.doLogout = this.doLogout.bind(this);
    }

    render() {
        return (
            <div>
                Signed in as {this.props.username}
                <button onClick={this.doLogout}>Log out</button>
            </div>
        )
    }

    doLogout() {
      this.authService.logout();
      this.onLogout({loggedIn: false, rememberUsername: this.props.rememberUsername});
    }
}

export default Profile;

