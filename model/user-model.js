const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{type:String},
    githubId:{type:String},
    followers:{type:Number},
    following:{type:Number},
    thumbnail:{type:String},
    repo: {type:Number}
})

const User = mongoose.model('GithubData', userSchema)

module.exports = User