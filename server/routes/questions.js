const express            = require('express');
const router             = express.Router();
const questionController = require('../controllers/QuestionController')
const auth               = require('../middlewares/auth')

router.post('/', questionController.create)
router.get('/', questionController.read)
router.get('/userquestion/:id', questionController.readUserQuestion)
router.get('/:id', questionController.readById)
router.put('/:id', questionController.update)
router.delete('/:id', questionController.delete)
router.post('/upvote', questionController.upvote)
router.post('/downvote', questionController.downvote)

module.exports = router;