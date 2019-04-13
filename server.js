const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const engine = require('ejs-mate');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');

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
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "Lord@#$%"
}));
app.use(flash());

app.engine('ejs', engine);
app.set('view engine', 'ejs')


//Home Page
app.get('/', (req, res) => {
  res.render('main/home');
});


//Redirecting to page, if user already exists
app.get('/signup', function (req, res, next) {
  res.render('../views/accounts/signup', {
    errors: req.flash('errors')
  });
});


//New User(Signup)
app.post('/signup', function(req, res, next) {
  const user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  User.findOne({ email : req.body.email } , function (err, existingUser) {

    if(existingUser){
//       return res.redirect('/signup');
      req.flash('errors', 'Account with that already exists');
      return res.redirect('signup');
    }
    else {
      user.save(function (err, user) {
        if (err) return next(err);
          res.redirect('/');
        });
      }
    });
});


//About Page
app.get('/about', (req, res) => {
  res.render('main/about');
});


app.listen('8080', (err) => {
  if (err) throw err;
  console.log("Server up on Port 8080");
});
