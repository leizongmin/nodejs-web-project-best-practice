'use strict';

/**
 * 测试 /api/topics 接口
 */

const should = require('should');
const request = require('supertest');
const project = require('../app');

describe('/lazy/data', function () {

  before(function (done) {
    project.ready(done);
  });

  it('should response null', function (done) {
    request(project.app)
      .get('/api/lazy/data')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        should.notEqual(res.body.data, null);
        done();
      });
  });

});
