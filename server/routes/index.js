const express    = require('express');
const router     = express.Router();
const users      = require('./users');
const questions  = require('./questions');
const answers    = require('./answers');

router.get('/', function(req, res, next) {
  res.send(`API Work`)
});

router.use('/api/users', users)
router.use('/api/questions', questions)
router.use('/api/answers', answers)

module.exports = router;
