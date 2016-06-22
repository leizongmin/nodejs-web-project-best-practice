'use strict';

const express = require('express');
const router = express.Router();
const Topic = require('../proxy/topic');
const config = require('../config');

/* 显示文章列表 */
router.get('/topics', function (req, res, next) {
  Topic.getList({}, (err, ret) => {
    if (err) return next(err);

    res.json({topics: ret});
  });
});

/* 获取文章详情 */
router.get('/topic/:id', function (req, res, next) {
  Topic.get(req.params.id, (err, ret) => {
    if (err) return next(err);

    res.json({topic: ret || null});
  });
});

/* 模拟需要查询数据库得到的配置信息 */
router.get('/lazy/data', function (req, res, next) {
  res.json({data: config.get('lazyConfig.data')});
});

module.exports = router;
