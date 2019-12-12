const router = require('express').Router();
var fetch = require('node-fetch')


router.route('/getCurrentLocation').post((req, res) => {
    const currentLocation = req.body.cityName;
    const url = "http://api.geonames.org/searchJSON?name_equals=" + currentLocation + "&username=destinationFinder";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.json(data);
    })
    .catch(console.log);
});

router.route('/getCityInfo').post((req, res) => {
    const city = req.body.cityName;
    const url = "http://api.geonames.org/searchJSON?name_equals=" + city + "&username=destinationFinder";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.json(data);
    })
    .catch(console.log);
});


module.exports = router;