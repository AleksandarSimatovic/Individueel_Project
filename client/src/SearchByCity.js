import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


const home = "De Bilt";
var cityFound = true;

class InformationSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: home,
            homeLat: "",
            homeLng: "",
            city: "De Bilt",
            isTemperature: false,
            isDistance: false,
            isContinent: false,
            lat: "",
            lng: "",
            population: "",
        };
    }
    onChangeTemperature = () => {
        this.setState(initialState => ({
            isTemperature: !initialState.isTemperature,
        }));
    }
    onChangeDistance = () => {
        this.setState(initialState => ({
            isDistance: !initialState.isDistance,
        }));
    }
    onChangePopulation = () => {
        this.setState(initialState => ({
            isPopulation: !initialState.isPopulation,
        }));
    }
    onChangeCity = (e) => {
        const citySelected = e.target.value;
        this.setState({city: citySelected});
    }

    getCurrentLocation() {
        axios.post('location/getCurrentLocation', {
            cityName: this.state.currentLocation
        })
        .then((res) => {
            this.setState({country: "",
                homeLat: res.data.geonames[0].lat,
                homeLng: res.data.geonames[0].lng
            }, this.getCityInfo());
        })
    }

    getCityInfo() {
        axios.post('location/getCityInfo', {
            cityName: this.state.city
        })
        .then((res) => {
            if(res.data.geonames.length>0){
                cityFound = true;
                this.setState({
                    country: res.data.geonames[0].countryName,
                    lat: res.data.geonames[0].lat, lng: res.data.geonames[0].lng,
                    population: res.data.geonames[0].population
                }, () => {
                    ReactDOM.render(<p>Country: {this.state.country}</p>, document.getElementById('countryName'))
                    this.getCityInfoTypes()
                    })
            }
            else {
                cityFound = false;
                ReactDOM.render(<p>City not found</p>, document.getElementById('cityName'));
                ReactDOM.render("", document.getElementById('countryName'));
                ReactDOM.render("", document.getElementById('temperature'));
                ReactDOM.render("", document.getElementById('distance'));
                ReactDOM.render("", document.getElementById('population'));
            }
        })
    }

    getTemperature = () => {
        axios.post('temperature/getTemperature', {
            cityName: this.state.city
        })
        .then((res) => {
            this.setState({temperature: res.data.toFixed(0) },
            () => ReactDOM.render(<div>Temperature: {this.state.temperature} degrees Celcius</div>,
            document.getElementById('temperature')));
        })
    }

    getDistance = () => {
        axios.post('distance/getDistance', {
            lat1: this.state.homeLat,
            lat2: this.state.lat,
            lng1: this.state.homeLng,
            lng2: this.state.lng
        })
        .then((res) => {
            ReactDOM.render(<p>Distance from {this.state.currentLocation} to {this.state.city}:<span>&nbsp;</span>{res.data} km</p>, document.getElementById('distance'));
        })
    }

    getCityInfoTypes = () => {
        if(cityFound === true){
            ReactDOM.render(<p>City: {this.state.city}</p>, document.getElementById('cityName'));

            if (this.state.isTemperature){
                this.getTemperature()
            }
            else{
                ReactDOM.render("", document.getElementById('temperature'));
            }
            if (this.state.isDistance){
                this.getDistance()
            }
            else {
                ReactDOM.render("", document.getElementById('distance'));
            }
            if (this.state.isPopulation){
                ReactDOM.render(<p>Population: {this.state.population}</p>, document.getElementById('population'));
            }
            else {
                ReactDOM.render("", document.getElementById('population'));
            }
        }
    }


    onSubmit = (e) => {
        e.preventDefault();
        this.getCurrentLocation();
    }
    render() {
        return (
        <div id="formCitySearch">
         <form onSubmit={this.onSubmit}>
              <h1>Choose a city and the information you wish to see</h1>
              <input type='text' onChange={this.onChangeCity} />
                <p>
                <label>
                  Temperature
                  <input
                    name="Temperature"
                    type="checkbox"
                    checked={this.state.name}
                    onChange={this.onChangeTemperature}/>
                </label>
                <label>
                  Distance
                  <input
                    name="Distance"
                    type="checkbox"
                    checked={this.state.name}
                    onChange={this.onChangeDistance}/>
                </label>
                 <label>
                  Population
                  <input
                    name="population"
                    type="checkbox"
                    checked={this.state.name}
                    onChange={this.onChangePopulation}/>
                </label>
              </p>
              <button>
                Get Info
              </button>

          </form>
          <div id="wrapper">
              <div id="searchInfo"></div>
              <div id="SearchByCity">
                <div id="currentCity"></div>
                <div id="selectInformationTypes"></div>
                <div id="cityName"></div>
                <div id="countryName"></div>
                <div id="latlng"></div>
                <div id="temperature"></div>
                <div id="distance"></div>
                <div id="temperatureInfo"></div>
                <div id="population"></div>
              </div>
          </div>
       </div>
       );
    }
}

export default InformationSelector