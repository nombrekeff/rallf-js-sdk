'use strict';


/**
 * Abstract logger, used in {Logger} or you can use it to create your own
 */
class AbstractLogger {
  constructor(notifier) {
    this.notifier = notifier;
    this.LOG_SEVERITY_EMERGENCY = 0;
    this.LOG_SEVERITY_ALERT = 1;
    this.LOG_SEVERITY_CRITICAL = 2;
    this.LOG_SEVERITY_ERROR = 3;
    this.LOG_SEVERITY_WARNING = 4;
    this.LOG_SEVERITY_NOTICE = 5;
    this.LOG_SEVERITY_INFO = 6;
    this.LOG_SEVERITY_DEBUG = 7;
    this.task_name = null;
    this.task = null;
  }


  /**
   * @param string message
   * @param mixed data
   * @param int severity , standard RFC3164 code (https://tools.ietf.org/html/rfc3164)
   * @param string channel
   */
  log(message, data = null, severity = 7, channel = '') {
    let log = {
      time: Date.now(),
      severity,
      channel,
      message,
      data
    };

    if (this.task) {
      log.message = this._replaceShortcuts(log.message, this.task);
    }

    this.notifier.notify(log);
  }

  capture(device) {
    return new Promise((resolve, reject) => {
      device.takeScreenshot((error, capture) => {
        if (error) {
          this.error('error', { error });
          reject({ error });
        } else {
          this.debug('capture', { capture });
          resolve({ capture });
        }
      });
    });
  }

  /**
   * @param $message
   * @param null $data
   * @param string $channel
   */
  debug(message, data = null, channel = '') {
    this.log(message, data, this.LOG_SEVERITY_DEBUG, channel);
  }

  /**
   * @param $message
   * @param null $data
   * @param string $channel
   */
  warning(message, data = null, channel = '') {
    this.log(message, data, this.LOG_SEVERITY_WARNING, channel);
  }

  /**
   * @param $message
   * @param null $data
   * @param string $channel
   */
  alert(message, data = null, channel = '') {
    this.log(message, data, this.LOG_SEVERITY_ALERT, channel);
  }

  /**
   * @param $message
   * @param null $data
   * @param string $channel
   */
  emergency(message, data = null, channel = '') {
    this.log(message, data, this.LOG_SEVERITY_EMERGENCY, channel);
  }

  /**
   * @param $message
   * @param null $data
   * @param string $channel
   */
  critical(message, data = null, channel = '') {
    this.log(message, data, this.LOG_SEVERITY_CRITICAL, channel);
  }

  /**
   * @param $message
   * @param null $data
   * @param string $channel
   */
  error(message, data = null, channel = '') {
    this.log(message, data, this.LOG_SEVERITY_ERROR, channel);
  }

  /**
   * @param $message
   * @param null $data
   * @param string $channel
   */
  info(message, data = null, channel = '') {
    this.log(message, data, this.LOG_SEVERITY_INFO, channel);
  }


  /**
   * @param {string} message 
   * @param {rallf.Task} task 
   */
  _replaceShortcuts(message, task) {
    // @ could be the fqtn of the task
    message = message.replace('@', task.fqtn);
    // $ could be the name of the task
    message = message.replace('$', task.name);
    // & could be some other property
    message = message.replace('%', task.robot.id);
    
    return message;
  }
}

module.exports = AbstractLogger;
