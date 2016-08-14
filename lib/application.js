'use strict';

var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');
var swagger = require('swagger-framework');
var docs = require('../docs');

var ROOT_PATH = process.cwd();
var logger = require(ROOT_PATH + '/lib/commons/logger');
var source = require(ROOT_PATH + '/lib/source');

var app = express();

app.use(parser.json());

app.use(morgan(':method :url :reqbody - :status', {
  stream: {
    write: logger.info
  }
}));

morgan.token('reqbody', function(req) {
  return JSON.stringify(req.body);
});

app.use(source.router);

//Configure Swagger
var framework = swagger.Framework({
  basePath: 'http://localhost:3000'
});

docs.init(framework);
app.use('/api-docs-source', framework.docs.dispatcher());
app.use(framework.dispatcher());
app.use('/api-docs', express.static(__dirname + '/../api-docs'));

module.exports = app;
