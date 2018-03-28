const Question = require('../models/Question')

module.exports = {
    create: (req,res) => {
        Question.create({
            title: req.body.title,
            questionBody: req.body.questionBody,
            userid: req.body.userid,
            upvote: req.body.userupvote_id,
            downvote: req.body.userdownvote_id,
        }, (err, newQuestion) => {
            if (err) {
                res.status(404).json({
                    message: `Failed to create new question`,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: `Create new question success`,
                    data: newQuestion
                })
            }
        })
    },

    read: (req,res) => {
        Question.find()
        .sort({createdAt:-1})
        .populate('userid')
        .exec()
        .then(questions => {
            res.status(200).json({
                message: `Get All Questions Success !`,
                data: questions
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({
                message: `Get All Questions Error !`,
                data: {}
            })
        })
    },

    readUserQuestion: (req,res) => {
        Question.find({ userid:req.params.id })
        .sort({createdAt:-1})
        .exec()
        .then(questions => {
            res.status(200).json({
                message: `Get All Questions Success !`,
                data: questions
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(202).json({
                message: `No Questions Found !`,
                data: {}
            })
        })
    },

    readById: (req,res) => {
        Question.findById(req.params.id)
        .populate('userid')
        .exec()
        .then((question) => {
            res.status(200).json({
                message: `Find question success !`,
                data: question
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: `Find question failed`,
                data: {}
            })
        })
    },

    update: (req,res) => {
        Question.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            questionBody: req.body.questionBody
        }, {new : true}, (err, updatedQuestion) => {
            if(err) {
                res.status(500).json({
                    message: `Error updating question`,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: `Success update question !`,
                    data: updatedQuestion
                })
            }
        })
    },

    delete: (req,res) => {
        Question.findByIdAndRemove(req.params.id, (err, deletedQuestion) => {
            if(err) {
                res.status(500).json({
                    message: `Error deleting question`,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: `Success delete question !`,
                    data: deletedQuestion
                })
            }
        })
    },

    upvote: (req, res) => {
        let userId = req.body.userId
        let questionId = req.body.questionId
        console.log(questionId)
        Question.findById(questionId, function (err, question) {
            console.log('======>', question)
            if (err) {
                res.status(400).json({
                    status: `failed ${err}`
                });
            } else {
                let check = true;

                question.upvote.forEach((questionUpvote, index) => {
                    if (questionUpvote == userId) {
                        console.log(`Samaa ! di index ${index}, ${userId} , ${questionUpvote}`)
                        check = false
                        var indexId = index
                        question.upvote.splice(indexId, 1)
                        question.save(function (err) {
                            if (err) {
                                res.status(400).json({
                                    status: 'failed'
                                });
                            } else {
                                res.status(200).json({
                                    message: 'You cancel Upvoting this post !',
                                    status: 0
                                });
                            }
                        });
                    }
                })

                if (check) {
                    question.downvote.forEach((questionDownvote, index) => {
                        if (questionDownvote == userId) {
                            console.log(`Samaa ! di index ${index}, ${userId} , ${questionDownvote}`)
                            var indexId = index
                            question.downvote.splice(indexId, 1)
                        }
                    })

                    question.upvote.push(userId)
                    question.save(function (err) {
                        if (err) {
                            res.status(400).json({
                                status: 'failed'
                            });
                        } else {
                            res.status(200).json({
                                message: 'You Upvote this post !',
                                status: 1
                            });
                        }
                    });
                }
            }
        })
    },

    downvote: (req, res) => {
        let userId = req.body.userId
        let questionId = req.body.questionId

        Question.findById(questionId, function (err, question) {
            if (err) {
                res.status(400).json({
                    status: `failed ${err}`
                });
            } else {
                let check = true;

                question.downvote.forEach((questionDownvote, index) => {
                    if (questionDownvote == userId) {
                        console.log(`Samaa ! di index ${index}, ${userId} , ${questionDownvote}`)
                        check = false
                        var indexId = index
                        question.downvote.splice(indexId, 1)
                        question.save(function (err) {
                            if (err) {
                                res.status(400).json({
                                    status: 'failed'
                                });
                            } else {
                                res.status(200).json({
                                    message: 'You cancel Downvoting this post !',
                                    status: 0
                                });
                            }
                        });
                    }
                })

                if (check) {
                    question.upvote.forEach((questionUpvote, index) => {
                        if (questionUpvote == userId) {
                            console.log(`Samaa ! di index ${index}, ${userId} , ${questionUpvote}`)
                            var indexId = index
                            question.upvote.splice(indexId, 1)
                        }
                    })
                    question.downvote.push(userId)
                    question.save(function (err) {
                        if (err) {
                            res.status(400).json({
                                status: 'failed'
                            });
                        } else {
                            res.status(200).json({
                                message: 'You Downvote this post !',
                                status: 1
                            });
                        }
                    });
                }
            }
        })
    }
}