var express = require('express');
var morgan = require('morgan');

var app = express();

//middleware
app.use(morgan('dev'));

app.get('/', (req,res) =>{
  res.json('my name is sahil'); //res.send-> for sending a normal response
});

app.listen('8080', (err) => {
  if (err) throw err;
  console.log("Server up on Port 8080");
});
