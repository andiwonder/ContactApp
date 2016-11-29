var mongoose = require('mongoose');

// Contact Schema
var contactSchema = mongoose.Schema({
  first_name : {
    type : String,
    required : true
  },
  last_name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  phone : {
    type : String,
    required : true
  },
  dob : {
    type : String,
    required : true
  },
  img_url : {
    type : String
  },
  comment : {
    type : String
  }
});

var Contact = module.exports = mongoose.model('Contact', contactSchema);

module.exports.getContacts = function(callback, limit){
  Contact.find(callback);
}


module.exports.getContact = function(id, callback){
  Contact.findById(id, callback);
}


module.exports.addContact = function(contact, callback){
  Contact.create(contact, callback);
}

module.exports.updateContact = function(id, contact, options, callback){
  var query = {_id: id};
  var update = {
    first_name : contact.first_name,
    last_name : contact.last_name,
    email: contact.email,
    dob: contact.dob,
    phone: contact.phone,
    img_url: contact.img_url,
    comment : contact.comment
  }
  // console.log("UPDATED NEW SHIT IS");
  // console.log(update);
  Contact.findOneAndUpdate({_id:id}, update, options, callback);
  // Contact.findOneAndUpdate(query._id, update, options, callback);
}

module.exports.removeContact = function(id, callback){
  var query = {_id: id};
  Contact.remove(query, callback);
}

