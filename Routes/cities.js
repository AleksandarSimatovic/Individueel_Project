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
    const ratings = req.body.cityRatings;
    const currentRating = req.body.currentRating;
    const currentRatingNumbers = req.body.currentRatingNumbers;

    const newCity = new City({
        cityName: req.body.cityName,
        countryName,
        distance,
        spokenLanguages,
        temperature,
        temperatureMax,
        temperatureMin,
        cityLat,
        cityLng,
        ratings,
        currentRatingNumbers,
        currentRating
    });

    newCity.save()
    .then(() => res.json('City added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').delete((req, res) => {

});


router.route('/updateCity').post((req,res) => {
    const cityNameReq = req.body.cityName;
    const username = req.body.username;
    const email = req.body.email;
    const message = req.body.message;
    const amountOfStars = req.body.amountOfStars;

    const ratingInput = {username, email, message, amountOfStars}
    City.find({cityName: cityNameReq})
    .then(city => {
        city[0].cityRating.push(ratingInput)
        city[0].currentRatingNumbers.push(amountOfStars)

        let rating = Number(city[0].currentRating);
        for(let i = 0;i<city[0].currentRatingNumbers.length;i++){
            rating += Number(city[0].currentRatingNumbers[i]);
        }
        city[0].currentRating = Number(Number(rating) / Number(city[0].currentRatingNumbers.length + 1));
        console.log(city[0].currentRating);
        city[0].save()
        res.json(city[0]);
    })
    .catch(err => res.status(400).json('Error: ' + err));
})



module.exports = router;

