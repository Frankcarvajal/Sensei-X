const mongoose = require('mongoose');

//schema for language db
const langSchema = mongoose.Schema({
    jap: {type: String, required: true}, 
    eng: {type: String, required: true}, 
    level: Number
})


langSchema.methods.apiRepr = function() {

  return {
    id: this._id,
    jap: this.jap,
    eng: this.eng,
    level: this.level
  };
}


const Lang = mongoose.model('Lang', langSchema);

module.exports = {Lang};