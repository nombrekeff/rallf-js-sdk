'use strict';

const fs = require('fs-extra');


let rallf = {
  Task: require('./src/integration').Task,
  fs
};

module.exports = rallf;
