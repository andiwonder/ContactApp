var mongoose = require('mongoose');

// Contact Schema
var groupSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  }, 
  create_date : {
    type: Date,
    default : Date.now
  }
});

var Group = module.exports = mongoose.model('Group', groupSchema);

module.exports.getGroups = function(callback, limit){
  Group.find(callback).limit(limit);
}