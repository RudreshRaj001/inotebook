const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type: String,
      required: true,
    },
    date:{
      type: Date,
      default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema); 
User.createIndexes(); // this helps in identifying duplicates (idk how tho)
module.exports = User; 
