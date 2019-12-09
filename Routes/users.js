const router = require('express').Router();
const jwt = require('jsonwebtoken');
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

router.route('/api/authenticate').post((req, res) => {
    const email = req.body.email;
      const password = req.body.password;
      User.findOne({ email }, function(err, user) {
            if (err) {
                  console.error(err);
                  res.status(500)
                    .json({
                    error: 'Internal error please try again'
                  });
                } else if (!user) {
                  res.status(401)
                    .json({
                      error: 'Incorrect email or password'
                    });
                } else {
                  user.isCorrectPassword(password, function(err, same) {
                        if (err) {
                              res.status(500)
                                .json({
                                  error: 'Internal error please try again'
                              });
                            } else if (!same) {
                              res.status(401)
                                .json({
                                  error: 'Incorrect email or password'
                              });
                            } else {
                              // Issue token
                              const payload = { email };
                              const token = jwt.sign(payload, secret, {
                                expiresIn: '1h'
                              });
                              res.cookie('token', token, { httpOnly: true })
                                .sendStatus(200);
                        }
              });
        }
      });
});

module.exports = router;