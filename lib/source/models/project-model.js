'use strict';
var BASE_DIR = ('../../../lib/');

var logger = require(BASE_DIR + '/commons/logger');
var db = require(BASE_DIR + '/commons/database');

var PROJECTS_COLLECTION_NAME = 'projects';

function create (project, callback) {
  var projects = db.getCollection(PROJECTS_COLLECTION_NAME);
  projects.insert(project, function(err, result) {
    if (err) {
      logger.error('insert project %s error: %s', project.name, err);
    }
    callback(err, result.ops[0]);
  });
}

function remove (projectName, callback) {
  var projects = db.getCollection(PROJECTS_COLLECTION_NAME);
  projects.remove({name: projectName}, function(err, result) {
    if (err) {
      logger.error('delete project %s error: %s', project.name, err);
    }
    callback(err, result);
  });
}

function find (projectName, callback) {
  var projects = db.getCollection(PROJECTS_COLLECTION_NAME);
  projects.findOne({name: projectName}, function(err, result) {
    if (err) {
      logger.error('delete project %s error: %s', project.name, err);
    }
    callback(err, result);
  });
}

module.exports = {
  create: create,
  remove: remove,
  find: find
};
