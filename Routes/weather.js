const router = require('express').Router();
var fetch = require('node-fetch')


router.route('/getWeather').post((req, res) => {

    const name = req.body.capitalName;
    const urlWeather = "http://api.openweathermap.org/data/2.5/weather?q=" + name + "&APPID=840e44ccd3376f040093e83e5be8f34f";
    fetch(urlWeather)
    .then(res => res.json())
    .then(data => {
        res.json(data);
    })
    .catch(console.log);
   });

module.exports = router;