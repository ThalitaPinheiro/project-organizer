'use strict';

var request = require('supertest');
var assert = require('chai').assert;

var BASE_LIB = ('../../../lib/');
var db = require(BASE_LIB  + 'commons/database');
var projectModel = require(BASE_LIB + 'source/models').project
var app = require(BASE_LIB + 'application');
var name = 'project to delete'

describe('DELETE projects integration tests - ', function() {
  beforeEach(function(done) {
    var now = new Date();
    var project = {
      name : name,
      createdAt: now,
      updatedAt: now
    };
    projectModel.create(project, done);
  });

  afterEach(function(done) {
    db.dropCollections('projects', done);
  });

  it('Should return 200. Project deleted', function(done) {
    request(app)
    .delete('/projects/' + name)
    .send()
    .end(function(err, res) {
      assert.isNull(err);
      assert.equal(200, res.statusCode);
      done();
    });
  });

  it('Should return 400 (bad request) cause project payload has no name', function(done) {
    request(app)
    .delete('/projects/nonExistentProject')
    .send({})
    .end(function(err, res) {
      assert.isNull(err);
      assert.equal(400, res.statusCode);
      done();
    });
  });

  it('Should return 404 cause the post uri is not found', function(done) {
    request(app)
    .post('/projects/something')
    .send({})
    .end(function(err, res) {
      assert.isNull(err);
      assert.equal(404, res.statusCode);
      done();
    });
  });
});
