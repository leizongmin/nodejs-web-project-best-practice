/* 配置文件 */

module.exports = {

  // 网站端口
  port: 3001,

  // MongoDB数据库连接
  db: 'mongodb://127.0.0.1/stuq_test',

  // 日志记录器
  log: {
    level: 'INFO',
    appenders: [
      { type: 'console' },
      {
        "type": "dateFile",
        "filename": "logs/",
        "pattern": "cheese-yyyy-MM-dd.log",
        "alwaysIncludePattern": true,
      },
    ],
  },

};
