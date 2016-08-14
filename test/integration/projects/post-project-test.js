'use strict';

var request = require('supertest');
var assert = require('chai').assert;

var BASE_LIB = ('../../../lib/');
var db = require(BASE_LIB  + 'commons/database');
var app = require(BASE_LIB + 'application');
var projectPayload = {
  name: 'project test'
};

describe('POST projects integration tests - ', function() {
  afterEach(function(done) {
    db.dropCollections('projects', done);
  });

  it('Should return 201. Project created', function(done) {
    request(app)
    .post('/projects')
    .send(projectPayload)
    .end(function(err, res) {
      assert.isNull(err);
      assert.equal(201, res.statusCode);
      done();
    });
  });

  it('Should return 400 (bad request) cause project payload has no name', function(done) {
    request(app)
    .post('/projects')
    .send({})
    .end(function(err, res) {
      assert.isNull(err);
      assert.equal(400, res.statusCode);
      done();
    });
  });

  it('Should return 400 (bad request) cause project name isn\'t strig', function(done) {
    var payload = { name: { teste: 'badRequest' } } ;
    request(app)
    .post('/projects')
    .send(payload)
    .end(function(err, res) {
      assert.isNull(err);
      assert.equal(400, res.statusCode);
      done();
    });
  });

  it('Should return 405 cause the post uri is not found and the method is not allowed', function(done) {
    request(app)
    .post('/projects/something')
    .send({})
    .end(function(err, res) {
      assert.isNull(err);
      assert.equal(405, res.statusCode);
      done();
    });
  });
});
