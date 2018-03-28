const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const answerSchema = new Schema({
    answerBody : String,
    userid : {type: Schema.Types.ObjectId, ref: `User`},
    upvote : [{
        type:Schema.Types.ObjectId, 
        ref: 'User'
    }],
    downvote : [{
        type:Schema.Types.ObjectId, 
        ref: 'User'
    }],
    questionid: {type: Schema.Types.ObjectId, ref: `Question`},
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;