'use strict';

var Chance = require('chance');

function generateTasks(options) {
  var chance = new Chance();
  return {
    project: {
      id: chance.guid(),
      name: options || chance.sentence()
    },
    descripion: chance.paragraph(),
    owner: chance.name(),
    dueDate: chance.date(),
    done: false
  };
};
module.exports = {
  tasks: generateTasks
};
