'use strict';

/**
 * User model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  loginname: { type: String },
  pass: { type: String },
  email: { type: String },
  url: { type: String },
  profile_image_url: { type: String },
  location: { type: String },
});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);
