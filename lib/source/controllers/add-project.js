'use strict';

var projectService = require('../services').projects;

module.exports = function(req, res) {
  if(req.body.name){
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
