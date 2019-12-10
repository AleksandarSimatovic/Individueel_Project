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

//router.route('/api/authenticate').post((req, res) => {
//    const email = req.body.email;
//      const password = req.body.password;
//      User.findOne({ email }, function(err, user) {
//            if (err) {
//                  console.error(err);
//                  res.status(500)
//                    .json({
//                    error: 'Internal error please try again'
//                  });
//                } else if (!user) {
//                  res.status(401)
//                    .json({
//                      error: 'Incorrect email or password'
//                    });
//                } else {
//                  user.isCorrectPassword(password, function(err, same) {
//                        if (err) {
//                              res.status(500)
//                                .json({
//                                  error: 'Internal error please try again'
//                              });
//                            } else if (!same) {
//                              res.status(401)
//                                .json({
//                                  error: 'Incorrect email or password'
//                              });
//                            } else {
//                              // Issue token
//                              const payload = { email };
//                              const token = jwt.sign(payload, secret, {
//                                expiresIn: '1h'
//                              });
//                              res.cookie('token', token, { httpOnly: true })
//                                .sendStatus(200);
//                        }
//              });
//        }
//      });
//});

module.exports = router;