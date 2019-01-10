'use strict';

const Logger = require('./logger');
const Devices = require('./devices');
const Robot = require('./robot');
const events = require('../lib/events');

/**
 * This is the class the user will need to extend from to create a Task
 */
class Task extends events.RallfEventEmitter {
  constructor() {
    super();

    this.logger = /** @type {Logger} */ new Logger(process, true, this);
    this.devices = /** @type {Devices} */ new Devices();
    this.robot = /** @param {Robot} */ new Robot();
    this._persisting = false;
    this._manifest = null;
    this._warmup_done = false;
    this.id = null;
    this.type = 'task';
  }

  get home() {
    return this.robot._cwd;
  }

  isSkill() {
    return this.type === 'skill';
  }


  isTask() {
    return this.type === 'task';
  }

  _hasDoneWarmup(val) {
    if (val) {
      this._warmup_done = val;
    } else return this._warmup_done;
    
    return null;
  }

  /**
   * Start method of the task.
   * This is the one that will be called when running.
   * @param {any} input - this is the input of your task, provided by the consumer
   * @return {Promise<any>}
   */
  start(input) {
    return Promise.resolve('Task has not implemented start method');
  }

  /**
   * @return {String|null}
   */
  get name() {
    return this._manifest ? this._manifest.name : null;
  }

  /**
   * @deprecated in favor of `Task.name`
   * @return {String|null}
   */
  getName() {
    return this._manifest ? this._manifest.name : null;
  }

  /**
   * @return {String|null}
   */
  get fqtn() {
    return this._manifest ? this._manifest.fqtn : null;
  }

  /**
   * @return {String|null}
   */
  get version() {
    return this._manifest ? this._manifest.version : null;
  }

  /**
   * @deprecated in favor of `Task.version`
   * @return {String|null}
   */
  getVersion() {
    return this._manifest ? this._manifest.version : null;
  }
}

module.exports = Task;