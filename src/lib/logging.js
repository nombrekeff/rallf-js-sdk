'use strict';
const clc = require('cli-color');
const jsonrpc = require('./jsonrpc');

module.exports = {
  color: true,
  prettyLogger(str) {
    process.stdout.write(str + '\n');
  },
  rpcLogger(str) {
    let log = {
      name: 'log',
      context: 'runner.js',
      content: {
        message: str,
        data: {},
        channel: 'runner.js',
        severity: 6
      }
    };
    let notif = jsonrpc.rpiecy.createRequest('event', log);
    notif.output();
  },
  logger(str) {
    process.stdout.write(str + '\n');
  },
  padd(str) {
    return ` ${str} `;
  },
  getClFromType(type) {
    if (!this.color) return (str) => str;
    switch (type) {
      case 'error':
        return clc.bgRedBright;
      case 'info':
        return clc.bgBlueBright;
      case 'success':
        return clc.bgGreenBright;
      case 'warn':
        return clc.bgYellowBright;
      default:
        return clc.blackBright;
    }
  },

  // Ugly, improve
  log(type, msg, data, channel = 'runner') {
    let cl = this.getClFromType(type);
    let segments = [
      cl(this.padd(type.toUpperCase().substr(0, 3))),
      '(' + this.getClFromType()(channel) + ')',
      msg,
      data ? this.getClFromType()(JSON.stringify(data, null, 2)) : null,
    ].filter((log) => log);
    let str = segments.join(' - ');
    this.logger(str);
  }
};