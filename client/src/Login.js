import React, { Component } from 'react';
import { login } from './userFunctions';
import ReactDOM from 'react-dom';


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email : '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if(res.length > 10) {
                this.props.history.push("/")
            }
            else{
                ReactDOM.render(<p>Incorrect email/password combination</p>, document.getElementById('errorMSG'))
            }
        })
    }

    render() {
        return (
        <div>
        <div id="errorMSG"></div>
          <form id="loginForm" onSubmit={this.onSubmit}>
            <h1>Login</h1>
            <input className="loginInput"
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onChange}
              required
            />
            <input className="loginInput"
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.onChange}
              required
            />
           <input type="submit" value="Login"/>
          </form>
          </div>
        );
    }
}