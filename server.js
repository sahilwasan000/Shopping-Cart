const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const engine = require('ejs-mate');


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
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.set('view engine', 'ejs')

//New User(Signup)
app.post('/signup', function(req, res, next) {
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  User.findOne({ email: req.body.email }, (err, existingUser) => {

    if(existingUser){
       console.log(`${req.body.email} already exists.`);
       return res.redirect('/signup');
  } else {
      user.save((err, user) => {
        if (err) return next(err)

        res.json('User has been created.');
        });
      }
    });
});

//Redirecting to page, if user already exists
app.get('/signup', (req, res, next) => {
  res.render('../views/accounts/signup');
});

//Home Page
app.get('/', (req, res) => {
  res.render('main/home');
});


//About Page
app.get('/about', (req, res) => {
  res.render('main/about');
});


app.listen('8080', (err) => {
  if (err) throw err;
  console.log("Server up on Port 8080");
});
