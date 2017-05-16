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
    gitHubId: {type: String, required: true},
    gitHubToken: {type:String, required: true}
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
    githubId: this.githubId,
    gitHubToken: this.githubToken,
  };
}

const Lang = mongoose.model('Lang', langSchema);
const User = mongoose.model('User', userSchema);

module.exports = {Lang, User};