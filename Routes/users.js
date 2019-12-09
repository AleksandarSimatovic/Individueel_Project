const router = require('express').Router();
let User = require('../models/User');

router.route('/api/register').post((req,res) => {

    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
        email,
        password
    });

    newUser.save()
    .then(() => res.json("Registered!"))
    .catch(err => res.status(400).json("Error: " + err));

});

module.exports = router;