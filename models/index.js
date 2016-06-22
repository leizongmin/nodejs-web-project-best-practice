'use strict';

const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.db, err => {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
require('./user');
require('./topic');

exports.User = mongoose.model('User');
exports.Topic = mongoose.model('Topic');
