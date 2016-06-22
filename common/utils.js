'use strict';

/**
 * 工具函数
 */

const MarkdownIt = require('markdown-it');

module.exports = function (project) {

  const exports = {};
  const md = new MarkdownIt();

  /* 渲染Markdown */
  exports.renderMarkdown = function (data) {
    return md.render(data);
  };

  return exports;

};
