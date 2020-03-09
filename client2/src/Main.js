import React, { Component } from "react";
import {
  Switch,
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import InformationSelector from "./SearchByCity";
import PreferenceInput from "./SearchByPreferences";
import CapitalInit from "./CapitalInit";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import AddComment from "./AddComment";
import withAuth from "./withAuth";

class Main extends Component {

  logOut(e) {
      e.preventDefault();
      localStorage.removeItem('usertoken');
      window.location = '/';
  }


    render(){
        const loginRegLink =
        <HashRouter>
            <div>
              <ul className="navHeader">
                  <li><NavLink to="/">Home</NavLink></li>
                  <li><NavLink to="/searchbycity">Search by City</NavLink></li>
                  <li><NavLink to="/searchbypreferences">Search by Preferences</NavLink></li>
                  <li className="admin"><NavLink to="/login">Login</NavLink></li>
                  <li className="admin"><NavLink to="/register">Register</NavLink></li>
              </ul>
              <div className="content">
                <Switch>
                   <Route exact path="/"/>
                   <Route path="/searchbycity" component={InformationSelector}/>
                   <Route path="/searchbypreferences" component={PreferenceInput}/>
                   <Route path="/login" component={Login}/>
                   <Route path="/register" component={Register}/>
               </Switch>
              </div>
            </div>
        </HashRouter>


        const userLink =
        <HashRouter>
            <div>
              <ul className="navHeader">
                  <li><NavLink to="/">Home</NavLink></li>
                  <li><NavLink to="/searchbycity">Search by City</NavLink></li>
                  <li><NavLink to="/searchbypreferences">Search by Preferences</NavLink></li>
                  <li><NavLink to="/addComment">Add rating</NavLink></li>
                  <li><NavLink to="/profile">Profile</NavLink></li>
                  <li><NavLink to="/" onClick={this.logOut.bind(this)}>Logout</NavLink></li>
                  <li className="admin"><NavLink to="/admin">Admin</NavLink></li>
              </ul>
              <div className="content">
                <Switch>
                   <Route exact path="/"/>
                   <Route exact path="/searchbycity" component={InformationSelector}/>
                   <Route exact path="/searchbypreferences" component={PreferenceInput}/>
                   <Route exact path="/admin" component={withAuth(CapitalInit)}/>
                   <Route path="/profile" component={Profile}/>
                   <Route path="/addComment" component={AddComment}/>
                </Switch>
              </div>
            </div>
        </HashRouter>


        return (
            <div>
                {localStorage.usertoken ? userLink : loginRegLink}
            </div>
        )
    }
}

export default Main;