import React, { Component } from 'react';
import './login.css';
import AuthenticationService from './authentication-service';

class Login extends Component {
    constructor(props){
        super(props);
        this.onLogin = props.onLogin;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.authenticationService = new AuthenticationService();
        this.state = {username: props.username || '', rememberUsername: props.rememberUsername, password: ''};
    }
    render() {
        return (
            <div id="login">
                <form onSubmit={this.handleSubmit}>
                    <input
                        className="form-item"
                        placeholder="Username"
                        name="username"
                        value={this.state.username}
                        type="text"
                        onChange={this.handleChange}
                    />
                    <input
                        className="form-item"
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <input
                        className="form-submit"
                        value="Login"
                        type="submit"
                    />
                    <input
                      type="checkbox"
                      value="true"
                      name="rememberUsername"
                      checked={this.state.rememberUsername}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="rememberUsername">Remember username?</label>
                </form>
            </div>
        );
    }

    handleChange({target}){
        const value = target.type === 'checkbox' ? target.checked : target.value;


        this.setState(
            {
                [target.name]: value
            }
        )
    }

    handleSubmit(e){
        e.preventDefault();

        this.authenticationService.login(this.state.username,this.state.password)
            .then(res =>{
                this.onLogin({
                  loggedIn: true,
                  username: this.state.username,
                  rememberUsername: this.state.rememberUsername
                });
            })
            .catch(err =>{
                console.warn(err);
            })
    }
}

export default Login;

