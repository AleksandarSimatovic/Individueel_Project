import React, { Component } from 'react';
import { register } from './userFunctions';


export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email : '',
            password: '',
            passwordAgain: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        if(this.state.password !== this.state.passwordAgain) {
            alert("Passwords don't match!");
        }
        else{
            const newUser = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            };

            register(newUser).then(res => {
                this.props.history.push("/login")
            })
        }
    }

    render() {
        return (
            <div id="registerForm">
              <form onSubmit={this.onSubmit}>
                <h1>Register an account</h1>
                <div id="registerInput">
                    <input className="registerInput"
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={this.state.username}
                      onChange={this.onChange}
                      required
                    />
                    <input className="registerInput"
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.onChange}
                      required
                    />
                    <input className="registerInput"
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={this.state.password}
                      onChange={this.onChange}
                      required
                    />
                    <input className="registerInput"
                      type="password"
                      name="passwordAgain"
                      placeholder="Enter password again"
                      value={this.state.passwordAgain}
                      onChange={this.onChange}
                      required
                    />
                </div>
               <input type="submit" value="Register"/>
              </form>
            </div>
        );
    }
}