'use strict';

var assert = require('chai').assert;
var supertest = require('supertest');
var ObjectID = require('mongodb').ObjectID;

var BASE_LIB = ('../../../lib/');
var db = require(BASE_LIB + 'commons/database');
var tasksModel = require(BASE_LIB + 'source/models/task-model')
var fixtures = require('../fixture');
var app = require(BASE_LIB + 'application');

var task;

describe('PATCH tasks integration tests', function() {
  beforeEach(function(done) {
    task = fixtures.tasks();
    tasksModel.insert(task, function(err, inserted) {
      task._id = inserted.insertedIds[0];
      done(err);
    });
  });

  afterEach(function(done) {
    db.dropCollections('tasks', 'projects', done);
  });

  it('Patch task - Shoud return 200 with a list', function(done) {
    supertest(app)
      .patch('/tasks/' + task._id)
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(200, res.statusCode)
        done();
    });
  });

  it('Patch tasks with invalid id - Shoud return 400', function(done) {
    supertest(app)
      .patch('/tasks/57b24f0a11efb2bf2e57d149')
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(400, res.statusCode);
        done();
    });
  });
});
