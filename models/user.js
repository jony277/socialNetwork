const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thought');

const validateEmail= function(email){
  const re = new RegExp("^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$");
  return re.test(email);
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required:true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, 'Please fill in a valid email address'],
    },
    thoughts:[
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
       }
  ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


userSchema
  .virtual('friendCount')
  .get(function(){
    return this.friends.length;
  })

const User = model('user', userSchema);
module.exports = User;