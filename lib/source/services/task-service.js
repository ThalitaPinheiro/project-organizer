'use strict';

var BASE_DIR = ('../../../lib/');
var logger = require(BASE_DIR + 'commons/logger');

var taskModel = require('../models').task;

function list(projectName, callback) {
  taskModel.getAllByProjectName(projectName, function(err, result){
    callback(err, result);
  });
}

module.exports = {
  list: list
};
