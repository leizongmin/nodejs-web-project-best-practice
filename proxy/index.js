'use strict';

/**
 * model 代理
 */

module.exports = function (project) {

  project.proxy = {};
  project.proxy.Topic = require('./topic')(project);

};