'use strict';
var express = require('express');
var router = new express.Router();

var controllers = require('./controllers')

router.get('/', function(req, res) {
  res.status(200).send('Hello World!!!');
});

router.post('/projects', controllers.project.post);

router.delete('/projects/:name', controllers.project.delete);

module.exports = router;
