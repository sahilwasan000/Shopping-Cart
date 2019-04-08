const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
});

/*Hashing passwords to db*/
UserSchema.pre('save', function(next){  //pre is a built in method
  var user = this;
  if(!user.isModified('password'))
    return next();
  bcrypt.genSalt(10, function(err, salt){
    if(err)
      return next(err);
    bcrypt.hash(user.password, salt, function(err, hash){
      if(err)
        return next(err);
      user.password = hash;
      next();
    });
  });
});

// UserSchema.pre('save', function (next) {
//   var user = this;
//
//   if(user.isModified('password')) {
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(user.password, salt, (err, hash) => {
//           user.password = hash;
//           next();
//       });
//     });
//   }
//   else {
//     next();
//   }
// });

/*Comparing Passwords*/
UserSchema.methods.comparePassword = function(password){  //add methods to create a custom method
  return bcrypt.compareSync(pasword, this.password);
}

module.exports = mongoose.model('User', UserSchema);
