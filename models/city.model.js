const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citySchema = new Schema({
    cityName: {type: String, required: true},
    countryName: {type: String, required: true},
    distance: {type: Number},
    spokenLanguages: {type: Array, required: true},
    temperature: {type: Number},
    cityLat: {type: Number},
    cityLng: {type: Number}
});

const City = mongoose.model('City', citySchema);

module.exports = City;