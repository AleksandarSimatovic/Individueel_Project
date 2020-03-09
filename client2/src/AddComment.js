import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class AddComment extends Component {

    constructor(){
        super();
        this.state = {
            cities: "",
            ratingMessage: "",
            selectedRating: "3"
        }
    }

    componentDidMount = () => {
        axios.get('cities')
        .then(response => {
            this.setState({cities: response.data})
            this.initializeCities()
        })
    }

    initializeCities(){
        // get cities from DB
        var cityInfo = this.state.cities;
        var cities = [];
        for (let i = 0; i<cityInfo.length;i++){
            cities[i] = cityInfo[i].cityName;
        }
        cities.sort();
        var select = document.getElementById('ratingSelectBtn');
        for(let x = 0; x<cities.length; x++){
            select.options[select.options.length] = new Option(cities[x], cities[x]);
        }
    }

    handleChange(e){
        this.setState({ratingMessage: e.target.value})
    }

    handleRatingChange(e){
        this.setState({selectedRating: e.target.value})
    }


    handleSubmit(e){
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        let city = e.target[0].value;
        let message = e.target[6].value;
        console.log(city + ": " + this.state.selectedRating + " stars. " + message);
        axios.post('users/updateUser', {
            username: decoded.username,
            city: city,
            message: message,
            amountOfStars: this.state.selectedRating
        })
        .then((res) => {
            console.log(res)
        })

        axios.post('cities/updateCity', {
            cityName: city,
            username: decoded.username,
            email: decoded.email,
            message: message,
            amountOfStars: this.state.selectedRating,
        })
        .then((res) => {
            console.log(res);
        })
    }


    render(){
        return(
            <div id="commentWrapper">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <h1 id="chooseCityTxt">Rate a city</h1>
                    <label> <p>City</p>
                        <select id="ratingSelectBtn" onChange={this.onChangeSort}>
                        </select>
                    </label>
                    <div id="ratingOptions">
                        <label> <p>Rating</p>
                            <input type="radio" value="1" checked={this.state.selectedRating === "1"}
                                                                onChange={this.handleRatingChange.bind(this)} />
                            1
                            <input type="radio" value="2" checked={this.state.selectedRating === "2"}
                                                                onChange={this.handleRatingChange.bind(this)} />
                            2
                            <input type="radio" value="3" checked={this.state.selectedRating === "3"}
                                                                onChange={this.handleRatingChange.bind(this)} />
                            3
                            <input type="radio" value="4" checked={this.state.selectedRating === "4"}
                                                                onChange={this.handleRatingChange.bind(this)} />
                            4
                            <input type="radio" value="5" checked={this.state.selectedRating === "5"}
                                                                onChange={this.handleRatingChange.bind(this)} />
                            5
                        </label>
                    </div>
                    <label> <p>Message</p>
                         <textarea rows="8" cols="50" id="ratingMSG" defaultValue={this.state.ratingMessage} onChange={this.onChange} />
                    </label>
                    <p>
                        <input type="submit" value="Submit" />
                    </p>
                </form>
            </div>
        )
    }
}

export default AddComment