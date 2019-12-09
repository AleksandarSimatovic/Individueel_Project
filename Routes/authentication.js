const router = require('express').Router();
const withAuth = require('../Middleware');

router.route('/api/secret').get(withAuth, function(req, res) {
  res.send('The password is potato');
});

router.route('/checkToken').get(withAuth, function(req, res) {
  res.sendStatus(200);
});

module.exports = router;