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

};

module.exports = controller;
