'use strict';

var BASE_DIR = ('../../../lib/');
var logger = require(BASE_DIR + 'commons/logger');

var models = require('../models');
var projectService = require('./project-service');

function list(projectName, callback) {
  models.task.getAllByProjectName(projectName, function(err, result){
    callback(err, result);
  });
}

function insertTask(project, body, callback) {
  var tasks;
  if(Array.isArray(body)){
    tasks = [];
    body.forEach(function(item){
      item.project = {
        id: project._id,
        name: project.name
      }
      if(!item.hasOwnProperty('done')) {
        item.done = false;
      }
      tasks.push(item);
    });
  } else {
    tasks = body;
    tasks.project = {
      id: project._id,
      name: project.name
    };
    if(!tasks.hasOwnProperty('done')) {
      tasks.done = false;
    }
  }
  models.task.insert(tasks, function(err, result){
    callback(err, result);
  });
}

function addTask(projectName, body, callback) {
  models.project.find(projectName, function(error, project){
    if(error){
      return callback(error)
    } else if(!project){
      projectService.create({name: projectName}, function(err, result){
        insertTask(result, body, callback);
      });
    } else {
      insertTask(project, body, callback);
    }
  });
}

function updateTask(taskId, callback) {
  models.task.done(taskId, function(err, result) {
    callback(err, result.nModified);
  });
}

module.exports = {
  list: list,
  addTask: addTask,
  updateTask: updateTask
};
