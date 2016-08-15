'use strict';

var ROOT_PATH = process.cwd();

var async = require('async');
var config = require(ROOT_PATH + '/lib/commons/config');
config.set('logging:console:silent', true);
var db = require(ROOT_PATH + '/lib/commons/database');

before(function(done) {
  var connection = config.get('mongo:connection');
  config.set('mongo:connection', connection + -'test');

  db.connect(connection + '-test', done);
});

after(function(done) {
  async.waterfall([
    function(callbackDrop) {
      // db.dropDatabase(callbackDrop);
      callbackDrop();
    },
    function(callbackClose) {
      db.close(callbackClose);
    }
  ], done);
});
