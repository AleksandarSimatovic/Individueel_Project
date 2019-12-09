const router = require('express').Router();
const user = require('../models/User.js');

router.route('/api/register').post((req,res) => {
    const {email, password} = req.body;
    const user = new User({ email, password});
    user.save( (err) => {
        if (err){
            res.status(500)
                .send("Error registering new user. Please try again");
        }
        else{
            res.status(200)
                .send("Registered!");
        }
    }));
});