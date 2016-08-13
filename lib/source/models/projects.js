'use strict';
var BASE_DIR = ('../../../lib/');

var ObjectID = require('mongodb').ObjectID;

var logger = require(BASE_DIR + '/commons/logger');
var db = require(BASE_DIR + '/commons/database');

var PROJECTS_COLLECTION_NAME = 'projects';

function create (projectName, callback) {
  var now = new Date();
  var project = {
    name : projectName,
    createdAt: now,
    updatedAt: now
  };

  insert(project, callback);
};

function insert (project, callback) {
  var projects = db.getCollection(PROJECTS_COLLECTION_NAME);
  projects.insert(project, function(err, result) {
    if (err) {
      logger.error('insert projet %s error: %s', project.name, err);
    }
    callback(err);
  });
}

module.exports = {
  create:create
};
