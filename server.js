var express = require('express');

var app = express();

app.listen('8080', (err) => {
  if (err) throw err;
  console.log("Server up on Port 8080");
});
