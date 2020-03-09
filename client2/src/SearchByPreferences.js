import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

class PreferenceInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temperature: "",
            minDist: 0,
            maxDist: 100000,
            minTemp: -100,
            maxTemp: 100,
            sortStrat: "distanceLow",
            amountOfCities: 1000,
            continent: "--",
            spokenLanguages: []
            };
    }

    onChangeMinDistance = (e) => {
        const minDist = e.target.value;
        this.setState({minDist: minDist});
    }

    onChangeMaxDistance = (e) => {
        const maxDist = e.target.value;
        this.setState({maxDist: maxDist});
    }

    onChangeMinTemperature = (e) => {
        const minTemp = e.target.value;
        this.setState({minTemp: minTemp});
    }

    onChangeMaxTemperature = (e) => {
        const maxTemp = e.target.value;
        this.setState({maxTemp: maxTemp});
    }

    onChangeContinent = (e) => {
        const continent = e.target.value;
        this.setState({continent: continent});
    }

    onChangeSpokenLanguages = (e) => {
            const languages = e.target.value;
            this.setState({spokenLanguages: languages});
        }

    onSubmit = (e) => {
        e.preventDefault();
        this.getCapitals();
    }

    getCapitals = (async() => {
        const response = await axios.get('cities');
        if(this.state.maxDist === ""){ this.setState({maxDist: 100000})};
        if(this.state.maxTemp === ""){ this.setState({maxTemp: 100})};
        if(this.state.minTemp === ""){ this.setState({minTemp: -100})};
        if(this.state.amountOfCities === ""){ this.setState({amountOfCities: 100})};
        ReactDOM.render(<this.showPrefOutput msg={response.data} />, document.getElementById('outputPrefSearch'));
    })

    onChangeSort = (e) => {
        this.setState({sortStrat: e.target.value});
    }

    onChangeAmountOfCities = (e) => {
        this.setState({amountOfCities: e.target.value});
    }

    sortBy(x){
        if(this.state.sortStrat === 'temperatureHigh'){
            x.sort(function (a, b ) {
                return b.temperatureMax - a.temperatureMax;
            })
        }
        else if (this.state.sortStrat === 'temperatureLow'){
            x.sort(function (a, b ) {
                return a.temperatureMin - b.temperatureMin;
            })
        }
        else if (this.state.sortStrat === 'distanceLow'){
            x.sort(function (a, b ) {
                return a.distance - b.distance;
            })
        }
        else if (this.state.sortStrat === 'distanceHigh'){
            x.sort(function (a, b ) {
                return b.distance - a.distance;
            })
        }
        else if(this.state.sortStrat === "tempDistCombi"){
            x.sort(function (b, a ) {
                return ((1/a.distance)*(a.temperatureMax+5)) - ((1/b.distance)*(b.temperatureMax+5));
            })
        }
        else if(this.state.sortStrat === "ratingHigh"){
            x.sort(function (a, b ) {
                return b.currentRating - a.currentRating;
            })
        }
        else if(this.state.sortStrat === "all"){
            x.sort(function (b, a ) {
                return (((1)/a.distance)*(a.temperatureMax+5)*(a.currentRating)) - (((1)/b.distance)*(b.temperatureMax+5)*(b.currentRating));
            })
        }
        else alert(this.state.sortStrat);
    }

    viewBtn = (x) => (event) => {
        event.preventDefault();

        var viewMSG = "User ratings: \n \n";

        for(let i = 0; i<x.length;i++){
            viewMSG += "Username: " + x[i].username + "\n";
            viewMSG += "Rating: " + x[i].amountOfStars + "\n";
            viewMSG += "Message: " + x[i].message + "\n";
            viewMSG += "\n";
        }

        alert(viewMSG);
    }

    showPrefOutput = (props) => {
        let x = props.msg;
        this.sortBy(x);
        let answer = [];
        answer[0] = <thead key="0"><tr>
                                        <td>City</td>
                                        <td>Country</td>
                                        <td>Distance (km) </td>
                                        <td>Temperature Now (C)</td>
                                        <td>Temperature Min (C)</td>
                                        <td>Temperature Max (C)</td>
                                        <td>Rating (1-5)</td>
                                        <td>Number of ratings</td>
                                        <td></td>
                                    </tr></thead>;
        let i = 1;
        let citiesDisplayed = 0;
        for (i = 1; i<props.msg.length + 1;i++){
            if(props.msg[i-1].distance >= this.state.minDist && props.msg[i-1].distance <= this.state.maxDist
                && props.msg[i-1].temperature >= this.state.minTemp && props.msg[i-1].temperature <= this.state.maxTemp
                ) {
                    if(this.state.continent !== "--"){
                        if(this.state.continent === props.msg[i-1].continent){
                            if(citiesDisplayed < this.state.amountOfCities) {
                                answer[i] = <tbody key={i}><tr>
                                                                <td>{props.msg[i-1].cityName}</td>
                                                                <td>{props.msg[i-1].countryName}</td>
                                                                <td>{props.msg[i-1].distance}</td>
                                                                <td>{props.msg[i-1].temperature}</td>
                                                                <td>{props.msg[i-1].temperatureMin}</td>
                                                                <td>{props.msg[i-1].temperatureMax}</td>
                                                                <td>{props.msg[i-1].currentRating.toFixed(1)}</td>
                                                                <td>{props.msg[i-1].cityRating.length}</td>
                                                                <td><button type="button" onClick={this.viewBtn(props.msg[i-1].cityRating)}>view</button></td>
                                                            </tr></tbody>
                                citiesDisplayed++;
                            }
                        }
                    }
                    else if (citiesDisplayed < this.state.amountOfCities) {

                        answer[i] = <tbody key={i}><tr>
                                                        <td>{props.msg[i-1].cityName}</td>
                                                        <td>{props.msg[i-1].countryName}</td>
                                                        <td>{props.msg[i-1].distance}</td>
                                                        <td>{props.msg[i-1].temperature}</td>
                                                        <td>{props.msg[i-1].temperatureMin}</td>
                                                        <td>{props.msg[i-1].temperatureMax}</td>
                                                        <td>{props.msg[i-1].currentRating.toFixed(1)}</td>
                                                        <td>{props.msg[i-1].cityRating.length}</td>
                                                        <td><button type="button" onClick={this.viewBtn(props.msg[i-1].cityRating)}>view</button></td>
                                                    </tr></tbody>
                        citiesDisplayed++;
                    }
            }
        }
        return (
            answer
        )
    }

    render() {
        return (
            <div>
                <div id="formPrefSearch">
                    <form onSubmit={this.onSubmit}>
                          <h2>Distance</h2>
                          <p>
                              <label>Min <span>&nbsp;</span>
                                <input type='text' onChange={this.onChangeMinDistance} />
                                  </label>
                                  <span>&nbsp;</span>
                                  <label>Max <span>&nbsp;</span>
                                <input type='text' onChange={this.onChangeMaxDistance} />
                              </label>
                          </p>
                          <h2>Temperature</h2>
                          <p>
                              <label>Min <span>&nbsp;</span>
                                <input type='text' onChange={this.onChangeMinTemperature} />
                              </label>
                              <span>&nbsp;</span>
                              <label>Max <span>&nbsp;</span>
                                <input type='text' onChange={this.onChangeMaxTemperature} />
                              </label>
                          </p>
                           <p>
                              <label>Sort by<span>&nbsp;</span>
                                  <select onChange={this.onChangeSort}>
                                    <option value="distanceLow">Distance Low to High</option>
                                    <option value="distanceHigh">Distance High to Low</option>
                                    <option value="temperatureHigh">Temperature High to Low</option>
                                    <option value="temperatureLow">Temperature Low to High</option>
                                    <option value="tempDistCombi">Temperature Distance Combi</option>
                                    <option value="ratingHigh">Only rating</option>
                                    <option value="all">All</option>
                                  </select>
                              </label>
                              <label><span>&nbsp;&nbsp;</span>Max amount of cities<span>&nbsp;</span>
                                <input type='text' onChange={this.onChangeAmountOfCities} />
                              </label>
                           </p>
                            <p>
                             <label>Continent<span>&nbsp;&nbsp;</span>
                                <select onChange={this.onChangeContinent}>
                                    <option value="--">Choose continent</option>
                                    <option value="EU">Europe</option>
                                    <option value="AF">Africa</option>
                                    <option value="NA">North America</option>
                                    <option value="SA">South America</option>
                                    <option value="AS">Asia</option>
                                    <option value="OC">Australia</option>
                                  </select>
                             </label>
                             </p>
                          <button type="submit">
                            Find cities!
                          </button>

                      </form>
                </div>
                  <div id="testDIV">
                    <table  id="outputPrefSearch"></table>
                  </div>
            </div>
        )
    }
}


export default PreferenceInput