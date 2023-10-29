const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
      trim: true,
      maxlength: [40, 'A user name must have less or equal then 30 characters'],
      minlength: [2, 'A user name must have more or equal then 2 characters'],
      validate: {
        validator: (val) => validator.isAlpha(val, ['en-US'], { ignore: `'` }), //" =" => " " & "-"
        message: 'A user name must only contain characters between A-Z',
      },
    },
    surname: {
      type: String,
      required: [true, 'A user must have a surname'],
      trim: true,
      maxlength: [
        40,
        'A user surname must have less or equal then 30 characters',
      ],
      minlength: [
        2,
        'A user surname must have more or equal then 2 characters',
      ],
      validate: {
        validator: (val) => validator.isAlpha(val, ['en-US'], { ignore: `'` }), //" =" => " " & "-"
        message: 'A user surname must only contain characters between A-Z',
      },
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
