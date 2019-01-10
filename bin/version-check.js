'use strict';
// const package = require('../package.json');
// const child_process = require('child_process');

module.exports = async (ncv) => {
  if (!ncv) {
    const update = require('please-update');
    const pkg = require('../package.json');

    return new Promise((resolve, reject) => {
      console.log('');
      update.default({
        package: pkg.name,
        version: pkg.version,
        persistCheck: false
      }).then((res) => {
        console.log('');
        if (res.update) {
          resolve('update available');
        } else {
          resolve('no update available');
        }
      });
    });
  } else Promise.resolve('no update available');
};

