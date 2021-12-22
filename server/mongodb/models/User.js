import mongoose from "mongoose";
const { Schema } = mongoose;
const bcrypt = require('bcrypt')
const { DateTime } = require('luxon')
const { isEmail } = require('validator')

const UserSchema = new Schema({

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Please enter an email!"],
    validate: [isEmail, "Please enter a valid email!"]

  },
  username: {
    type: String,
    required: [true, "Please enter a username!"],
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password!"],
    minlength: [3, "Password must be longer than 3 characters!"]
  },
  bio: {
    type: String,
    default: null
  },
  location: {
    type: String,
    default: null
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },

  pendingFRequests: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  }


}, {
  toJSON: {
    virtuals: true
  }
});

UserSchema
  .virtual('formattedRegisterDate')
  .get(function () {
    return DateTime.fromJSDate(this.registerDate).toLocaleString(DateTime.DATE_MED)
  })

export default mongoose.models.User ?? mongoose.model("User", UserSchema);
