'use strict';
var BASE_DIR = ('../../../lib/');

var ObjectID = require('mongodb').ObjectID;

var moment = require('moment');
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

function insert(task, callback) {
  var tasks = db.getCollection(TASKS_COLLECTION_NAME);
  tasks.insert(task, function(err, result) {
    if (err) {
      logger.error('insert tasks error: %s',  err);
    }
    callback(err, result);
  });
}

function consolidateTaskStatus(data) {
  var now = moment();
  var completed = 0;
  var late = 0;
  var total = data.length;


  data.forEach(function(item) {
    if (item.status.done) {
      completed++;
    } else if (moment(item.status.dueDate) < now) {
      late++;
    }
  });

  return {
    completed: completed,
    late: late,
    total: total
  };
}

function aggregateStatus(projectName, callback) {
  var tasks = db.getCollection(TASKS_COLLECTION_NAME);
  tasks.aggregate([{
    $match: {
      'project.name': projectName
    }
  }, {
    $group: {
      _id: {
        dueDate: '$dueDate',
        done: '$done'
      }
    }
  }, {
    $project: {
      _id: 0,
      status: '$_id'
    }
  }], function(err, data) {
    if (err) {
      logger.error('Count status tasks error: %s',  err);
      callback(err);
    } else {
      var consilidateData = consolidateTaskStatus(data);
      callback(null, consilidateData);
    }
  });
}

function done(taskId, callback) {
  var tasks = db.getCollection(TASKS_COLLECTION_NAME);
  var set = {
    $set: {
      done: true
    }
  };
  tasks.update({_id: ObjectID(taskId)}, set, function(err, ret) {
    if (err) {
      logger.error('Update status tasks error: %s',  err);
    }
    callback(err, ret.result);
  });
}

module.exports = {
  getAllByProjectName: getAllByProjectName,
  removeAllByProjectName: removeAllByProjectName,
  insert: insert,
  aggregateStatus: aggregateStatus,
  done: done
};
