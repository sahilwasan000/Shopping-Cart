const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

/*The User Schema Attr*/
var UserSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password:  {type: String, minLength: 6},

  profile: {
    name: {type: String, default: ''},
    picture: {type: String, default: ''}
  },

  address: String,
  history: [{
    date: Date,
    paid: {type: Number, default: 0}
  }]

})
