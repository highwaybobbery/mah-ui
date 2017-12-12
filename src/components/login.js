import React, { Component } from 'react';
import './login.css';
import AuthService from './auth-service';

class Login extends Component {
    constructor(props){
        super(props);
        this.onAuthorize = props.onAuthorize;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Auth = new AuthService();
        this.state = {username: props.username || '', rememberUsername: props.rememberUsername, password: ''};
    }
    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
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

        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
                console.log('calling onAuthorize callback');
                this.onAuthorize({
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

