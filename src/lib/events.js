'use strict';
const EventEmitter = require('events').EventEmitter;
class RallfEventEmitter extends EventEmitter {
  constructor() {
    super();
  }

  /**
   * Listens for any event
   * !! Should be overwriten ¡¡ 
   * @param {function(event: string, data: any)} listener 
   */
  onAny() {
    return null;
  }

  emit(evt, ...rest) {
    this.onAny(evt, ...rest);
    super.emit(evt, ...rest);
  }
}


module.exports = {
  RallfEventEmitter
};