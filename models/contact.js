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
    type : String,
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

module.exports.updateContact = function(id, contact_edit, options, callback){
  var query = {_id: id};
  var update = {
    first_name : contact_edit.first_name,
    last_name : contact_edit.last_name,
    email: contact_edit.email,
    dob: contact_edit.dob,
    phone: contact_edit.phone,
    img_url: contact_edit.img_url
  }
  Contact.findOneAndUpdate(query._id, update, options, callback);
}

module.exports.removeContact = function(id, callback){
  var query = {_id: id};
  Contact.remove(query, callback);
}

