const router = require('express').Router();

router.route('/getDistance').post((req, res) => {
    const lat1 = req.body.lat1;
    const lat2 = req.body.lat2;
    const lon1 = req.body.lng1;
    const lon2 = req.body.lng2;
    let radius = 6371;
    let dLat = deg2rad(lat2-lat1);
    let dLon = deg2rad(lon2-lon1);
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let distance = radius * c;
    res.send(distance.toFixed(1));
});


function deg2rad(deg) {
   return deg * (Math.PI/180);
}


module.exports = router;