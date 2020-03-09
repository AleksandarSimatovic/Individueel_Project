import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './navbar.css'
import InformationSelector from '../SearchByCity'
import CapitalInit from '../CapitalInit'
import PreferenceInput from '../SearchByPreferences'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <Router>
                <header className="navHeader">
                    <nav className="nav">
                        <div>
                            <ul className="navLinks">
                                <li><Link to="/searchbycity">Login</Link></li>
                                <li><Link to="/searchbypreferences">Register</Link></li>
                                <li className="admin"><button onClick={adminClick} >Admin</button></li>
                            </ul>
                            <Route path="/searchbycity" component={searchByCityClick}></Route>
                            <Route path="/searchbypreferences" component={searchByPreferencesClick}></Route>
                        </div>
                    </nav>
                </header>
            </Router>

        );
    }
}

function searchByCityClick(){
            ReactDOM.render(< Navbar />, document.getElementById('navbar'));
            ReactDOM.render(<InformationSelector />, document.getElementById('searchInfo'));
}

function searchByPreferencesClick(){
    ReactDOM.render(<PreferenceInput />, document.getElementById('searchByPreferences'));
}

function adminClick(){
    console.log(document);
    ReactDOM.render(<CapitalInit />, document.getElementById('fillDBWithCapitals'));
}

export default Navbar;