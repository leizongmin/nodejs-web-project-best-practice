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
class Project {

  constructor(envs) {

    // 初始化函数
    this.initFunctions = [];

    // 是否已经初始化
    this.inited = false;

    // 是否初始化时出错
    this.error = null;

    // 当初始化完成时执行的回调函数列表
    this.callbacks = [];

    // 载入配置
    this.initFunctions.push(next => {
      this.config = require('./config')(envs);
      next();
    });

    // 载入models
    this.initFunctions.push(next => {
      require('./models')(this);
      next();
    });

    // 载入model代理
    this.initFunctions.push(next => {
      require('./proxy')(this);
      next();
    });

    // 载入公共函数
    this.initFunctions.push(next => {
      require('./common')(this);
      next();
    });

    // 载入路由处理程序
    this.initFunctions.push(next => {
      this.routes = {};
      this.routes.index = require('./routes/index')(this);
      this.routes.apis = require('./routes/apis')(this);
      next();
    });

    // 创建express实例
    this.initFunctions.push(next => {

      const app = this.app = express();

      // 设置模板引擎
      app.set('views', path.join(__dirname, 'views'));
      app.engine('html', ejs.renderFile);
      app.set('view engine', 'html');

      // 模板全局变量
      app.locals.config = this.config;
      app.locals.utils = this.common.utils;

      // 载入和初始化中间件
      app.use(log4js.connectLogger(this.common.logger, { level: log4js.levels.INFO, format: ':method :url' }));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(cookieParser());
      app.use(express.static(path.join(__dirname, 'public')));

      // 注册路由
      app.use('/', this.routes.index);
      app.use('/api', this.routes.apis);

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
    this.initFunctions.push(next => {
      this.config.set('lazyConfig.data', null);
      setTimeout(() => {
        this.config.set('lazyConfig.data', new Date());
        next();
      }, 2000);
    });

    // 监听端口
    this.initFunctions.push(next => {
      if (this.config.get('port') > 0) {
        this.app.listen(this.config.get('port'), err => {
          if (err) return next(err);

          console.log('服务器已启动。  http://127.0.0.1:%d', this.config.get('port'));
          next();
        });
      } else {
        next();
      }
    });

  }

  // 当初始化完成时执行回调
  ready(callback) {
    if (this.error) return callback(this.error);
    if (this.inited) return callback(null);
    this.callbacks.push(callback);
  }

  // 初始化
  init(callback) {
    async.series(this.initFunctions, err => {

      this.inited = true;
      this.error = err || null;

      // 处理回调函数
      this.callbacks.forEach(callback => {
        callback(err);
      });

      callback(err);

    });
  }
};

// 模块输出
module.exports = Project;
