'use strict';

var BASE_DIR = ('../../../lib/');
var logger = require(BASE_DIR + 'commons/logger');

var projectModel = require('../models/projects');

function create(payload, callback) {
  projectModel.create(payload.name, function(err){
    callback(err);
  });
}

module.exports = {
  create: create
};
