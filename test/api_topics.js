'use strict';

/**
 * 测试 /api/topics 接口
 */

const should = require('should');
const request = require('supertest');
const project = require('../app');

describe('/api/topics', function () {

  before(function (done) {
    project.ready(done);
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
