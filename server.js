const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./models/user');

const app = express();

mongoose.connect('mongodb://root:abc123@ds233806.mlab.com:33806/shopping-cart', function(err) { //'db url'
  if (err){
    console.log(err);
  } else {
    console.log("connected to database");
  }
});


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/createUser', function(req, res, next) {
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  user.save(function(err){
    if (err) next(err);

    res.json('Successfully Created');
  });
});


app.listen('8080', (err) => {
  if (err) throw err;
  console.log("Server up on Port 8080");
});
