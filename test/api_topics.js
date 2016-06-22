'use strict';

/**
 * 测试 /api/topics 接口
 */

const should = require('should');
const request = require('supertest');
const Project = require('../app');

describe('/api/topics', function () {

  let project = new Project(process.env.NODE_ENV);

  before(function (done) {
    project.init(done);
  });

  it('should response topics', function (done) {
    request(project.app)
      .get('/api/topics')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        should.not.exists(res.body.error);
        res.body.topics.should.be.an.Array();
        done();
      });
  });

});
