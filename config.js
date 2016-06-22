'use strict';

/**
 * 载入配置文件
 */

const createNamespace = require('lei-ns').create;

// 默认是development
const envs = (process.env.NODE_ENV || 'development').split(',');
envs.unshift('default');

// 载入配置文件
const config = createNamespace();
envs.forEach(env => {
  const c = require('./config/' + env + '.js');
  config.merge(c);
});

module.exports = config;
