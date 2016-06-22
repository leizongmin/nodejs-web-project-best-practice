'use strict';

/**
 * 连接到数据库
 */

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
