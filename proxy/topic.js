'use strict';

/**
 * Topic model 代理
 */

const Topic = require('../models/topic');

exports.getList = function (query, callback) {
  Topic.find(query, {content: 0}, callback);
};

exports.get = function (id, callback) {
  Topic.findOne({_id: id}, callback);
};
