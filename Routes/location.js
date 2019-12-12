const router = require('express').Router();
var fetch = require('node-fetch')


router.route('/getCurrentLocation').post((req, res) => {
    const currentLocation = req.body.cityName;
    console.log(currentLocation)
    const url = "http://api.geonames.org/searchJSON?name_equals=" + currentLocation + "&username=destinationFinder";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.json(data);
    })
    .catch(console.log);
});



module.exports = router;