'use strict';

var taskService = require('../services').task;

var controller = {};

controller.get = function(req, res) {
  taskService.list(req.params.projectName,function(err, taskList) {
    if(err){
      res.status(500).end();
    } else if (taskList.length) {
      res.status(200).send(taskList);
    } else {
      res.status(404).end();
    }
  })
};

controller.post = function(req, res) {
  taskService.addTask(req.params.projectName, req.body, function(err, result) {
console.log(result);
    if (err) {
      return res.status(500).send(err).end();
    }
    res.status(201).end();
  });
};

module.exports = controller;
