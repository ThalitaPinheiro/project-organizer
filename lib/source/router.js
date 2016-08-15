'use strict';
var express = require('express');
var router = new express.Router();

var controllers = require('./controllers')

router.get('/', function(req, res) {
  res.status(200).send('Hello World!!!');
});

//projects
router.post('/projects', controllers.project.post);

router.delete('/projects/:name', controllers.project.delete);

router.get('/projects/:name', controllers.project.get);

//Tasks
router.get('/projects/:projectName/tasks', controllers.task.get);

router.post('/projects/:projectName/tasks', controllers.task.post);

router.patch('/tasks/:taskId', controllers.task.patch);

module.exports = router;
