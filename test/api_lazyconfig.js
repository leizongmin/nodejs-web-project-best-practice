'use strict';

/**
 * 测试 /api/topics 接口
 */

const should = require('should');
const request = require('supertest');
const app = require('../app');

describe('/lazy/data', function () {

  it('should response null', function (done) {
    request(app)
      .get('/api/lazy/data')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        should.equal(res.body.data, null);
        done();
      });
  });

});
