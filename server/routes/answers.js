const express            = require('express');
const router             = express.Router();
const answerController   = require('../controllers/AnswerController')
const auth               = require('../middlewares/auth')

router.post('/', answerController.create)
router.get('/questionid/:questionid', answerController.readByQuestionId)
router.post('/upvote', answerController.upvote)
router.post('/downvote', answerController.downvote)


module.exports = router;