import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';


class Profile extends Component {
    constructor() {
        super();
        this.state ={
        username: '',
        email: '',
        ratings: []
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        let ratings = decoded.ratings;
        console.log(ratings);
        this.setState({
            username: decoded.username,
            email: decoded.email,
            type: decoded.type,
            //ratings: ratings[3].city
        })
    }

    render() {
        return (
            <div id="profileInfo">
                <table>
                    <tbody id="profileTable">
                        <tr>
                            <td>Username</td>
                            <td>{this.state.username}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>{this.state.type}</td>
                        </tr>
                        <tr>
                            <td>ratings</td>
                            <td>
                                {this.state.ratings}
                                Coming soon..
                                <table>
                                    <tbody id="ratingProfile">

                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}


export default Profile