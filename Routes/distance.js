const router = require('express').Router();


router.route('/getDistance').post((req, res) => {

    const cityName = req.body.cityName;
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=840e44ccd3376f040093e83e5be8f34f";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const temp = Number(data.main.temp) - 273.15;
        res.json(temp);
    })
    .catch(console.log);
   });

module.exports = router;