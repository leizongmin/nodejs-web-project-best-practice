'use strict';

const express = require('express');
const router = express.Router();
const Topic = require('../models').Topic;

/* 显示文章列表 */
router.get('/', function (req, res, next) {
  Topic.find({}, {content: 0}, (err, ret) => {
    if (err) return next(err);

    res.render('index', {
      title: '文章列表',
      topics: ret,
    });
  });
});

/* 获取文章详情 */
router.get('/topic/:id', function (req, res, next) {
  Topic.findOne({_id: req.params.id}, (err, ret) => {
    if (err) return next(err);
    if (!ret) return next(new Error('文章不存在'));

    res.render('topic', {
      title: ret.title,
      topic: ret,
    });
  });
});

module.exports = router;
