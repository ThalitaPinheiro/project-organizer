'use strict';

var BASE_DIR = ('../../../lib/');
var logger = require(BASE_DIR + 'commons/logger');

var models = require('../models');

function create(payload, callback) {
  var now = new Date();
  var project = {
    name : payload.name,
    createdAt: now,
    updatedAt: now
  };
  models.project.create(project, function(err, inserted){
    callback(err, inserted);
  });
}

function remove(projectName, callback) {
  models.project.remove(projectName, function(err, ret){
    if(err || ret.n === 0){
      callback(err, ret);
    } else {
      models.task.removeAllByProjectName(projectName, function(error){
        callback(error, ret.result.n);
      });
    }
  });
}

module.exports = {
  create: create,
  remove: remove
};
