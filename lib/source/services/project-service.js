'use strict';

var BASE_DIR = ('../../../lib/');
var logger = require(BASE_DIR + 'commons/logger');

var projectModel = require('../models').project;

function create(payload, callback) {
  var now = new Date();
  var project = {
    name : payload.name,
    createdAt: now,
    updatedAt: now
  };
  projectModel.create(project, function(err){
    callback(err);
  });
}

function remove(projectName, callback) {
  projectModel.remove(projectName, function(err, ret){
    callback(err, ret.result.n);
  });
}

module.exports = {
  create: create,
  remove: remove
};
