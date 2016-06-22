'use strict';

const express = require('express');

module.exports = function (project) {

  const router = express.Router();

  /* 显示文章列表 */
  router.get('/', function (req, res, next) {
    project.proxy.Topic.getList({}, (err, ret) => {
      if (err) return next(err);

      res.render('index', {
        title: '文章列表',
        topics: ret,
      });
    });
  });

  /* 获取文章详情 */
  router.get('/topic/:id', function (req, res, next) {
    project.proxy.Topic.get(req.params.id, (err, ret) => {
      if (err) return next(err);
      if (!ret) return next(new Error('文章不存在'));

      res.render('topic', {
        title: ret.title,
        topic: ret,
      });
    });
  });

  return router;

};
