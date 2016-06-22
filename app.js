'use strict';

const async = require('async');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const log4js = require('log4js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');

// 项目共享变量
const project = {

  // 初始化函数
  initFunctions: [],

  // 是否已经初始化
  inited: false,

  // 是否初始化时出错
  error: null,

  // 当初始化完成时执行回调
  callbacks: [],
  ready(callback) {
    if (project.error) return callback(project.error);
    if (project.inited) return callback(null);
    project.callbacks.push(callback);
  },

};

// 载入配置
project.initFunctions.push(next => {
  project.config = require('./config');
  next();
});

// 载入models
project.initFunctions.push(next => {
  require('./models')(project);
  next();
});

// 载入model代理
project.initFunctions.push(next => {
  require('./proxy')(project);
  next();
});

// 载入公共函数
project.initFunctions.push(next => {
  require('./common')(project);
  next();
});

// 载入路由处理程序
project.initFunctions.push(next => {
  project.routes = {};
  project.routes.index = require('./routes/index')(project);
  project.routes.apis = require('./routes/apis')(project);
  next();
});

// 创建express实例
project.initFunctions.push(next => {

  const app = project.app = express();

  // 设置模板引擎
  app.set('views', path.join(__dirname, 'views'));
  app.engine('html', ejs.renderFile);
  app.set('view engine', 'html');

  // 模板全局变量
  app.locals.config = project.config;
  app.locals.utils = project.common.utils;

  // 载入和初始化中间件
  app.use(log4js.connectLogger(project.common.logger, { level: log4js.levels.INFO, format: ':method :url' }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // 注册路由
  app.use('/', project.routes.index);
  app.use('/api', project.routes.apis);

  // 404页面
  app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // API出错
  app.use('/api', function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

  // 出错页面
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: app.get('env') === 'development' ? err : {},
    });
  });

  next();
});

// 模拟需要查询数据库得到的配置信息
project.initFunctions.push(next => {
  project.config.set('lazyConfig.data', null);
  setTimeout(() => {
    project.config.set('lazyConfig.data', new Date());
    next();
  }, 2000);
});

// 监听端口
project.initFunctions.push(next => {
  if (project.config.get('port') > 0) {
    project.app.listen(project.config.get('port'), err => {
      if (err) return next(err);

      console.log('服务器已启动。  http://127.0.0.1:%d', project.config.get('port'));
      next();
    });
  } else {
    next();
  }
});

// 初始化
async.series(project.initFunctions, err => {

  project.inited = true;
  project.error = err || null;

  // 处理回调函数
  project.callbacks.forEach(callback => {
    callback(err);
  });

});

// 模块输出
module.exports = project;
