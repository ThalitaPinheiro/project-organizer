'use strict';

var BASE_DIR = ('../../../lib/');
var logger = require(BASE_DIR + 'commons/logger');

var models = require('../models');

function list(projectName, callback) {
  models.task.getAllByProjectName(projectName, function(err, result){
    callback(err, result);
  });
}

function addTask(projectName, body, callback) {
  var tasks;
  if(Array.isArray(body)){
    tasks = [];
    body.forEach(function(item){
      item.project = {
        name: projectName
      }
      tasks.push(item);
    });
  } else {
    tasks = body;
    tasks.project = {
      name: projectName
    };
  }
  models.task.insert(tasks, function(err, result){
    callback(err, result);
  });
}

module.exports = {
  list: list,
  addTask: addTask
};
