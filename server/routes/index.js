const express   = require('express');
const router    = express.Router();
const users     = require('./users');


router.get('/', function(req, res, next) {
  res.send(`API Work`)
});

router.use('/api/users', users)

module.exports = router;
