'use strict';
const RallfFS = require('../lib/rallf-fs');

class Robot extends RallfFS {
  constructor(cwd, id = null) {
    super(cwd);
    this.skills = [];
    this.id = id;
  }

  /**
   * Delegate a task locally
   * @param {string} task_identifier         - can be the name or the id 
   * @param {*} method                       - method to run
   * @param {*} data                         - data to send to method
   * @param {Object} options                 - Additional options
   * @param {boolean} options.auto_terminate - if task should be terminated on delegateFinish
   * @returns {Promise<any>}
   */
  delegateLocal(task_identifier, method, data, options) {
    return Promise.reject('Oopsy, it seems like delegate is not setup for this task');
  }

  /**
   * Delegate a task in other incubator
   * @param {string} task_identifier         - can be the name or the id 
   * @param {*} method                       - method to run
   * @param {*} data                         - data to send to method
   * @param {Object} options                 - Additional options
   * @param {boolean} options.auto_terminate - if task should be terminated on delegateFinish
   * @returns {Promise<any>}
   */
  delegateExternal(task_identifier, method, data, options) {
    return Promise.reject('Oopsy, it seems like delegate is not setup for this task');
  }
}

module.exports = Robot;

