'use strict';

/**
 * User model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function (project) {

  const UserSchema = new Schema({
    name: { type: String },
    loginname: { type: String },
    pass: { type: String },
    email: { type: String },
    url: { type: String },
    profile_image_url: { type: String },
    location: { type: String },
  });

  project.mongoose.model('User', UserSchema);
  project.model.User = project.mongoose.model('User', UserSchema);

};
