'use strict';

/**
 * 载入配置文件
 */

// 默认是development
const env = process.env.NODE_ENV || 'development';

// 载入配置文件
const config = require('./config/' + env + '.js');

module.exports = config;
