'use strict';

var assert = require('chai').assert;
var supertest = require('supertest');
var ObjectID = require('mongodb').ObjectID;

var BASE_LIB = ('../../../lib/');
var db = require(BASE_LIB + 'commons/database');
var models = require(BASE_LIB + 'source/models')
var fixtures = require('../fixture');
var app = require(BASE_LIB + 'application');

var task;

describe('GET project integration tests', function() {
  function populate (projectName, doneTask, dateTask, done) {
    task = fixtures.tasks();
    task.project.name = projectName;
    task.done = doneTask;
    task.dueDate = dateTask;
    var now = new Date();
    var project = {
      name : projectName,
      createdAt: now,
      updatedAt: now
    };
    models.project.create(project, function(err){
      models.task.insert(task, function(err) {
          done(err);
      });
    });
  }

  afterEach(function(done) {
    db.dropCollections('tasks', 'projects', done);
  });

  it('Get project with a late task - Shoud return 200 with a status', function(done) {
    populate('lateTest', false, new Date(99,5,24), function(){
      supertest(app)
        .get('/projects/lateTest')
        .end(function(err, res) {
          assert.isNull(err);
          assert.equal(200, res.statusCode);
          assert.strictEqual('lateTest', res.body.name);
          assert.strictEqual('0/1/1', res.body.status);
          done();
      });
    });
  });

  it('Get project with a done task - Shoud return 200 with a status', function(done) {
    populate('doneTest', true, new Date(99,5,24), function(){
      supertest(app)
        .get('/projects/doneTest')
        .end(function(err, res) {
          assert.isNull(err);
          assert.equal(200, res.statusCode);
          assert.strictEqual('doneTest', res.body.name);
          assert.strictEqual('1/0/1', res.body.status);
          done();
      });
    });
  });

  it('Get project - Shoud return 200 with a status', function(done) {
    populate('okTest', false, new Date(9999,5,24), function(){
      supertest(app)
        .get('/projects/okTest')
        .end(function(err, res) {
          assert.isNull(err);
          assert.equal(200, res.statusCode);
          assert.strictEqual('okTest', res.body.name);
          assert.strictEqual('0/0/1', res.body.status);
          done();
      });
    });
  });

  it('Get inexistent project - Shoud return 404', function(done) {
    supertest(app)
      .get('/projects/notfound')
      .end(function(err, res) {
        assert.isNull(err);
        assert.equal(404, res.statusCode);
        done();
    });
  });
});
