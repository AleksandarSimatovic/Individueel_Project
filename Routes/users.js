const router = require('express').Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let User = require('../models/User');
router.use(cors())

const secret = process.env.SECRET;

router.route('/api/register').post((req,res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const today = new Date();
    const type = req.body.type;
    const ratings = req.body.ratings;

    const newUser = new User({
        today,
        username,
        email,
        password,
        type,
        ratings
    });

    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                newUser.password = hash
                User.create(newUser)
                .then(user => {
                    res.json({status: user.email + "Registered"})
                })
                .catch(err => {
                    res.send('error: ' + err)
                })
            })
        }
        else{
            res.json({ error: "Email already exists" })
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })

});

router.route('/api/login').post((req,res) => {
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password))  {
                const payload = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    type: user.type,
                    ratings: user.ratings
                }
                let token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: 1440
                })
                res.send(token)
            }
            else{
                res.json({error: "Email and password don't match"})
            }
        }
        else{
            res.json({ error: "User doesn't exists" })
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
});

router.route('/updateUser').post((req,res) => {
    const username = req.body.username;
    const city = req.body.city;
    const message = req.body.message;
    const amountOfStars = req.body.amountOfStars;
    const ratingInput = {message, amountOfStars, city}
    User.find({username: username})
    .then(user => {
        user[0].ratings.push(ratingInput)
        user[0].save()
        res.json(user[0]);
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;