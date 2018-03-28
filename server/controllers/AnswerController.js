const Answer    = require('../models/Answer')

module.exports  = {
    create: (req,res) => {
        Answer.create({
            answerBody: req.body.answerBody,
            userid: req.body.userid,
            upvote: req.body.userupvote_id,
            downvote: req.body.userdownvote_id,
            questionid: req.body.questionid,
        }, (err, newAnswer) => {
            if (err) {
                res.status(404).json({
                    message: `Failed to create new answer`,
                    data: {}
                })
            } else {
                res.status(200).json({
                    message: `Create new answer success`,
                    data: newAnswer
                })
            }
        })
    },
    readByQuestionId: (req,res) => {
        Answer.find({ questionid:req.params.questionid })
        .populate('userid')
        .sort({createdAt:-1})
        .exec()
        .then(questions => {
            res.status(200).json({
                message: `Get All Answers Success !`,
                data: questions
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(202).json({
                message: `No Answer Found !`,
                data: {}
            })
        })
    },
    upvote: (req, res) => {
        let userId = req.body.userId
        let answerId = req.body.answerId
        console.log(answerId)
        Answer.findById(answerId, function (err, answer) {
            if (err) {
                res.status(400).json({
                    status: `failed ${err}`
                });
            } else {
                let check = true;

                answer.upvote.forEach((answerUpvote, index) => {
                    if (answerUpvote == userId) {
                        console.log(`Samaa ! di index ${index}, ${userId} , ${answerUpvote}`)
                        check = false
                        var indexId = index
                        answer.upvote.splice(indexId, 1)
                        answer.save(function (err) {
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
                    answer.downvote.forEach((answerDownvote, index) => {
                        if (answerDownvote == userId) {
                            console.log(`Samaa ! di index ${index}, ${userId} , ${answerDownvote}`)
                            var indexId = index
                            answer.downvote.splice(indexId, 1)
                        }
                    })

                    answer.upvote.push(userId)
                    answer.save(function (err) {
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
        let answerId = req.body.answerId

        Answer.findById(answerId, function (err, answer) {
            if (err) {
                res.status(400).json({
                    status: `failed ${err}`
                });
            } else {
                let check = true;

                answer.downvote.forEach((answerDownvote, index) => {
                    if (answerDownvote == userId) {
                        console.log(`Samaa ! di index ${index}, ${userId} , ${answerDownvote}`)
                        check = false
                        var indexId = index
                        answer.downvote.splice(indexId, 1)
                        answer.save(function (err) {
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
                    answer.upvote.forEach((answerUpvote, index) => {
                        if (answerUpvote == userId) {
                            console.log(`Samaa ! di index ${index}, ${userId} , ${answerUpvote}`)
                            var indexId = index
                            answer.upvote.splice(indexId, 1)
                        }
                    })
                    answer.downvote.push(userId)
                    answer.save(function (err) {
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