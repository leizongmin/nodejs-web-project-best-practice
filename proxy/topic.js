'use strict';

/**
 * Topic model 代理
 */

module.exports = function (project) {

  const exports = {};

  exports.getList = function (query, callback) {
    project.model.Topic.find(query, {content: 0}, callback);
  };

  exports.get = function (id, callback) {
    project.model.Topic.findOne({_id: id}, callback);
  };

  return exports;

};
