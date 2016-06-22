'use strict';

/**
 * 连接到数据库
 */

const mongoose = require('mongoose');

module.exports = function (project) {

  // 创建 MongoDB 连接
  project.mongoose = mongoose.createConnection(project.config.get('db'), err => {
    if (err) {
      console.error('connect to %s error: ', project.config.get('db'), err.message);
      process.exit(1);
    }
  });

  // models
  project.model = {};
  require('./user')(project);
  require('./topic')(project);

};

