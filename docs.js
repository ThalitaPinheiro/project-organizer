'use strict';

var docs = function() {};

docs.prototype.init = function(framework) {

  //POST project
  var api_project_index = framework.api(require('./spec/resources/project/index'));
  var api_project_resource = api_project_index.resource(require('./spec/resources/project/post-project'));
  api_project_resource.operation(require('./spec/operations/project/post-project'));
  api_project_index.model(require('./spec/models/project/project-input'));

  //DELETE - project
  var api_deleteProject_resource = api_project_index.resource(require('./spec/resources/project/delete-project'));
  api_deleteProject_resource.operation(require('./spec/operations/project/delete-project'));
  api_project_index.model(require('./spec/models/project/delete-project-input'));
};

exports = module.exports = new docs();
exports.docs = docs;
