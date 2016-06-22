'use strict';

const express = require('express');
const router = express.Router();
const Topic = require('../models').Topic;

/* 显示文章列表 */
router.get('/topics', function (req, res, next) {
  Topic.find({}, {content: 0}, (err, ret) => {
    if (err) return next(err);
    res.json({topics: ret});
  });
});

/* 获取文章详情 */
router.get('/topic/:id', function (req, res, next) {
  Topic.findOne({_id: req.params.id}, (err, ret) => {
    if (err) return next(err);
    res.json({topic: ret || null});
  });
});

module.exports = router;
