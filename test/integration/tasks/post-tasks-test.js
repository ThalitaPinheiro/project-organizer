'use strict';

var request = require('supertest');
var assert = require('chai').assert;

var BASE_LIB = ('../../../lib/');
var db = require(BASE_LIB  + 'commons/database');
var app = require(BASE_LIB + 'application');
var fixtures = require('../fixture');

describe('POST projects integration tests - ', function() {
  afterEach(function(done) {
    db.dropCollections('projects', 'tasks', done);
  });

  it('Should return 201. task created', function(done) {
    var task = fixtures.tasks();
    request(app)
    .post('/projects/test/tasks')
    .send(task)
    .end(function(err, res) {
      assert.isNull(err);
      assert.equal(201, res.statusCode);
      done();
    });
  });
  it('Should return 201. Task array inserted', function(done) {
    var tasks = [];
    for(var i=0; i<4; i++) {
      var item = fixtures.tasks();
      delete item.project;
      tasks.push(item);
    }

    request(app)
    .post('/projects/test/tasks')
    .send(tasks)
    .end(function(err, res) {
      assert.isNull(err);
      assert.equal(201, res.statusCode);
      done();
    });
  });
});
