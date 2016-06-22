'use strict';

/**
 * 日志记录器
 */

const log4js = require('log4js');

module.exports = function (project) {

  log4js.configure({appenders: project.config.get('log.appenders')});

  const logger = log4js.getLogger('cheese');
  logger.setLevel(project.config.get('log.level'));

  return logger;

};
