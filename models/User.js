const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    default: "user"
  }
});

module.exports = User = mongoose.model("users", UserSchema);

//const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
//
//const saltRounds = 10;
//
//const Schema = mongoose.Schema;
//const UserSchema = new Schema({
//    email: {type: String, unique: true},
//    password: {type: String}
//});
//
//UserSchema.pre('save', function(next) {
//    if(this.isNew) {
//        const document = this;
//        bcrypt.hash(document.password, saltRounds,
//        (err, hashedPassword) => {
//            if(err){
//                next(err);
//            }
//            else{
//                document.password = hashedPassword;
//                next();
//            }
//        });
//        this.password = "dsgdfsgfdsgsdfg";
//    }
//    else {
//        this.password = "headgf";
//        next();
//    }
//});
//
//UserSchema.methods.isCorrectPassword = function(password, callback){
//    bcrypt.compare(password, this.password, function(err, same){
//       if(err) callback(err);
//       else callback(err, same);
//    });
//}
//
//module.exports = mongoose.model('User', UserSchema);
