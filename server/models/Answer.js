const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const answerSchema = new Schema({
    title     : String,
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
})

const Answer = mongoose.model('Question', questionSchema);

module.exports = Answer;