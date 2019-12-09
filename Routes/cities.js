const router = require('express').Router();
let City = require('../models/city.model');

router.route('/').get((req, res) => {
    City.find()
    .then(cities => res.json(cities))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const cityName = req.body.cityName;
    const countryName = req.body.countryName;
    const distance = req.body.distance;
    const spokenLanguages = req.body.spokenLanguages;
    const temperature = req.body.temperature;
    const cityLat = req.body.cityLat;
    const cityLng = req.body.cityLng;

    const newCity = new City({
        cityName: req.body.cityName,
        countryName,
        distance,
        spokenLanguages,
        temperature,
        cityLat,
        cityLng
    });

    newCity.save()
    .then(() => res.json('City added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').delete((req, res) => {

});

module.exports = router;
