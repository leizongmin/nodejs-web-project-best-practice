'use strict';

/**
 * 公共函数
 */

module.exports = function (project) {

  project.common = {};
  project.common.logger = require('./logger')(project);
  project.common.utils = require('./utils')(project);

};
