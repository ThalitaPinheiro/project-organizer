'use strict';

var projectService = require('../services').project;

var controller = {};

controller.post = function(req, res) {
  if(req.body.name && (typeof req.body.name === 'string')){
    projectService.create(req.body, function(err, result) {
      if (err) {
        return res.status(500).send(err).end();
      }
      res.status(201).end();
    });
  } else {
    res.status(400).end();
  }
};

controller.delete = function(req, res) {
  projectService.remove(req.params.name, function(err, deleted) {
    if (err) {
      return res.status(500).send(err).end();
    } else if (deleted) {
      res.status(200).end();
    }else {
      res.status(400).end();
    }
  });
};

controller.get = function(req, res) {
  projectService.get(req.params.name, function(err, project) {
    if (err) {
      return res.status(500).send(err).end();
    } else if (project) {
      res.status(200).send(project).end();
    }else {
      res.status(404).end();
    }
  });
};

module.exports = controller;
