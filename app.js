'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');

// 载入路由处理程序
const routes = require('./routes/index');
const users = require('./routes/users');

// 创建express实例
const app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// 载入和初始化中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 注册路由
app.use('/', routes);
app.use('/users', users);

// 404页面
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 出错页面
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {},
  });
});

// 监听端口
const port = process.env.PORT || 3000;
app.listen(port, err => {
  if (err) throw err;
  console.log('服务器已启动。  http://127.0.0.1:%d', port);
});
