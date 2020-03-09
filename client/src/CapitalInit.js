import React from 'react'
import calculateDistance from './util'
import axios from 'axios';

var homeLat = 52.11;
var homeLng = 5.18;

class CapitalInit extends React.Component {
    initDB = () => {
        axios.get('location/getCountryInfo')
        .then(res => {
            let i;
            for (i = 0; i< res.data.geonames.length;i++){
                if(res.data.geonames[i].capital.length > 0){
                    const name = res.data.geonames[i].capital;
                    const countryName = res.data.geonames[i].countryName;
                    const spokenLanguages = res.data.geonames[i].languages;
                    const continent = res.data.geonames[i].continent;
                    axios.post('location/getSpecificCity', {
                        capitalName: name
                    })
                    .then(res => {
                        try{
                            let lat = res.data.geonames[0].lat;
                            let lng = res.data.geonames[0].lng;
                            const distance = calculateDistance(homeLat, homeLng, lat, lng);
                            axios.post('weather/getWeather', {
                                capitalName: name
                            })
                            .then((res) => {
                                try{
                                    let temp = res.data.main.temp;
                                    let tempMax = (res.data.main.temp_max - 273.15).toFixed(0);
                                    let tempMin = (res.data.main.temp_min - 273.15).toFixed(0);
                                    let tempCelcius = (temp - 273.15).toFixed(0);
                                    const city = {
                                        "cityName": name,
                                        "countryName": countryName,
                                        "spokenLanguages": spokenLanguages,
                                        "distance": distance,
                                        "temperature": tempCelcius,
                                        "temperatureMax": tempMax,
                                        "temperatureMin": tempMin,
                                        "cityLat": lat,
                                        "cityLng": lng,
                                        "currentRating": 3,
                                        "continent": continent,
                                    }
                                    axios.post('cities/add', city)
                                }
                                catch(e){
                                    console.log(e);
                                }
                            })
                        }
                        catch(e){
                            console.log(e);
                        }
                    })
                }
            }
            console.log("DB filled with capitals");
        })
        .catch(console.log);
    }

    render() {
    return(
        <div id="DBInitBtn">
            <button onClick={this.initDB} >Initialize Database</button>
        </div>
    )}
}

export default CapitalInit
