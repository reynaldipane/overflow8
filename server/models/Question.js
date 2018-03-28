const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const questionSchema = new Schema({
    title     : String,
    questionBody : String,
    userid : {type: Schema.Types.ObjectId, ref: `User`},
    upvote : [{
        type:Schema.Types.ObjectId, 
        ref: 'User'
    }],
    downvote : [{
        type:Schema.Types.ObjectId, 
        ref: 'User'
    }],
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;