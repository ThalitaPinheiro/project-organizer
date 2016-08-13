'use strict';

var BASE_LIB = ('../../../lib/');
var request = require('supertest');
var assert = require('chai').assert;
var app = require(BASE_LIB + 'application');

var projectPayload = {
  name: 'project test'
};

describe('Projects integration tests - ', function() {
  // afterEach(function(done) {
  //   db.drop('projects', done());
  // });

  describe('Success scenarios.', function() {
    it('Should return 201. Project created', function(done) {
      request(app)
      .post('/projects')
      .send(projectPayload)
      .end(function(err, res) {
        assert.equal(201, res.statusCode);
        done();
      });
    });
  });
});
