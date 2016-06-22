'use strict';

const express = require('express');
const router = express.Router();
const Topic = require('../proxy/topic');

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

module.exports = router;
