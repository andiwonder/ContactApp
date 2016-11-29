var express = require('express'); // Express web server framework
var app= express();
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var ejs = require("ejs");
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/invonto');
var db = mongoose.connection;


Group = require('./models/group');
Contact = require('./models/contact');


app.use(urlencodedBodyParser);
app.use(express.static(path.join(__dirname, './public')));


app.get('/', function(req,res) {
  res.render('index.html');
});

app.get('/api/groups', function(req,res) {
  Group.getGroups (function (err, groups){
    if (err) {
      throw err;
    } 
    res.json(groups);
  })
})

app.get('/api/contacts', function(req,res) {
  Contact.getContacts (function (err, contacts){
    if (err) {
      throw err;
    } 
    res.json(contacts);
  })
})

app.get('/api/contacts/:_id', function(req, res){
  Contact.getContact(req.params._id, function(err, contact){
    if(err){
      throw err;
    }
    res.json(contact);
  });
});


app.post('/api/contacts', function(req, res){
  var contact = req.body;
  console.log("post request made");
  // console.log(req.headers);
  console.log(req.body);
  Contact.addContact(contact, function(err, contact){
    if(err){
      throw err;
    }
    res.json(contact._id);
  });
});

app.put('/api/contacts/:id', function(req, res){
  var id = req.params.id;
  var contact = req.body;
  // console.log("put request made with id " + id);
  // console.log(req.body);
  Contact.updateContact(id, contact, {}, function(err, contact){
    if(err){ throw err; }
    // console.log("put request made callback");
    // console.log(req.body);
    // console.log(contact);
    res.json(req.body);
  });
});

app.delete('/api/contacts/:id', function(req, res){
  console.log("delete request made");
  var id = req.params.id;
  console.log(id);
  Contact.removeContact(id, function(err, contact){
    if(err){
      throw err;
    }
    res.json(contact);
  });
});

app.listen(3000);
console.log("Running on port 3000");
