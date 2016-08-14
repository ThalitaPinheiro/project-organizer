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

//Tasks
router.get('/projects/:projectName/tasks', controllers.task.get);

router.post('/projects/:projectName/tasks', controllers.task.post);

module.exports = router;
