'use strict';
var BASE_DIR = ('../../../lib/');

var ObjectID = require('mongodb').ObjectID;

var logger = require(BASE_DIR + '/commons/logger');
var db = require(BASE_DIR + '/commons/database');

var TASKS_COLLECTION_NAME = 'tasks';

function getAllByProjectName(projectName, callback) {
  var tasks = db.getCollection(TASKS_COLLECTION_NAME);
  tasks.find({'project.name': projectName}, {dueDate: 1}).toArray(function(err, result) {
    if (err) {
      logger.error('delete project %s error: %s', project.name, err);
    }
    callback(err, result);
  });
}

function removeAllByProjectName(projectName, callback) {
  var tasks = db.getCollection(TASKS_COLLECTION_NAME);
  tasks.remove({'project.name': projectName}, {multi: true}, function(err, result) {
    if (err) {
      logger.error('delete tasks of project %s error: %s', project.name, err);
    }
    callback(err, result);
  });
}

function insert (task, callback) {
  var tasks = db.getCollection(TASKS_COLLECTION_NAME);
  tasks.insert(task, function(err, result) {
    if (err) {
      logger.error('insert tasks error: %s',  err);
    }
    callback(err, result);
  });
}

module.exports = {
  getAllByProjectName: getAllByProjectName,
  removeAllByProjectName: removeAllByProjectName,
  insert: insert
};
