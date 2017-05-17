const mongoose = require('mongoose');

//schema for language db
const langSchema = mongoose.Schema({
    jap: {type: String, required: true}, 
    eng: {type: String, required: true}, 
    level: Number
})

const userSchema = mongoose.Schema({
    name: {type: String, required: false}, 
    email: {type: String, required: false},
    gitHubHandle: {type: String, required: false},
    gitHubId: {type: String, required: true},
    accessToken: {type:String, required: true},
    points: {type:Number, required: false}
})


langSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    jap: this.jap,
    eng: this.eng,
    level: this.level
  };
}

userSchema.methods.apiRepr = function() {
  return {
    name: this.name,
    gitHubHandle: this.gitHubHandle,
    githubId: this.githubId,
    points: this.points
  };
}

const Lang = mongoose.model('Lang', langSchema);
const User = mongoose.model('User', userSchema);

module.exports = {Lang, User};