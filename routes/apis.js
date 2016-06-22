'use strict';

const express = require('express');

module.exports = function (project) {

  const router = express.Router();

  /* 显示文章列表 */
  router.get('/topics', function (req, res, next) {
    project.proxy.Topic.getList({}, (err, ret) => {
      if (err) return next(err);

      res.json({topics: ret});
    });
  });

  /* 获取文章详情 */
  router.get('/topic/:id', function (req, res, next) {
    project.proxy.Topic.get(req.params.id, (err, ret) => {
      if (err) return next(err);

      res.json({topic: ret || null});
    });
  });

  /* 模拟需要查询数据库得到的配置信息 */
  router.get('/lazy/data', function (req, res, next) {
    res.json({data: project.config.get('lazyConfig.data')});
  });

  return router;

};
