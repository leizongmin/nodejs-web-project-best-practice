'use strict';

/**
 * 载入配置文件
 */

// 默认是development
const envs = (process.env.NODE_ENV || 'development').split(',');
envs.unshift('default');

// 载入配置文件
let config = {};
envs.forEach(env => {
  const c = require('./config/' + env + '.js');
  Object.assign(config, c);
});

module.exports = config;
