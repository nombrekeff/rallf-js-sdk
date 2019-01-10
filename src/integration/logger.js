'use strict';

const AbstractLogger = require('../abstract/logger-abstract');
const clc = require('cli-color');
const jsonrpc = require('../lib/jsonrpc');

/**
 * Used for logging
 * @extends AbstractLogger
 */
class Logger extends AbstractLogger {

  /**
   * 
   * @param {*} process 
   * @param {*} pretty 
   */
  constructor(____, pretty, parentTask) {
    super({
      notify: (log) => {
        if (this.pretty) {
          process.stdout.write(`${clc.bgCyan(' LOG ')} - (${clc.blackBright(this.task_name)}) - [${new Date(log.time).toLocaleString()}] - ${this.getString(log.severity)} - ${log.message} - ${JSON.stringify(log.data)}\n`);
        } else {
          log.channel = this.task_name;
          process.stdout.write(jsonrpc.request('log', log) + '\n');
        }
      },
      task: parentTask
    });
    this.pretty = pretty;
    this.task = parentTask;
  }

  /**
   * 
   * @param {number} severity
   * @return {string} 
   */
  getString(severity) {
    return [
      'EMERGENCY',
      'ALERT',
      'CRITICAL',
      'ERROR',
      'WARNING',
      'NOTICE',
      'INFO',
      'DEBUG',
    ][severity];
  }

  /**
   * @param {WebDriver} device 
   * @param {Boolean} saveLocal 
   */
  capture(device, saveLocal = false) {
    return new Promise((resolve, reject) => {
      let fname = 'img_' + Date.now() + '.png';
      let captureFN = saveLocal
        ? device.saveScreenshot.bind(device, fname)
        : device.takeScreenshot;

      captureFN((error, capture) => {
        if (error) {
          this.error('error', { error });
          reject({ error });
        } else {
          this.debug('capture: ' + fname, { capture });
          resolve({ capture });
        }
      });
    });
  }
}

module.exports = Logger;
