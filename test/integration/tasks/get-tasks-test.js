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

describe('GET tasks integration tests', function() {
  before(function(done) {
    task = fixtures.tasks();
    tasksModel.insert(task, function(err) {
      done(err);
    });
  });

  after(function(done) {
    db.dropCollections('tasks', 'projects', done);
  });

  it('Get task of a project - Shoud return 200 with a list', function(done) {
    supertest(app)
      .get('/projects/' + task.project.name + '/tasks')
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(200, res.statusCode);
        assert.equal(1, res.body.length);
        done();
    });
  });

  it('Get tasks of a non existent project - Shoud return 404', function(done) {
    supertest(app)
      .get('/projects/newName/tasks')
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(404, res.statusCode);
        done();
    });
  });
});
