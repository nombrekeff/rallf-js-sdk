'use strict';

const now = (unit) => {
  const hrTime = process.hrtime();
  let result = 0;
  switch (unit) {
    case 'milli':
      result = hrTime[0] * 1000 + hrTime[1] / 1000000;
      break;
    case 'micro':
      result = hrTime[0] * 1000000 + hrTime[1] / 1000;
      break;
    case 'nano':
      result = hrTime[0] * 1000000000 + hrTime[1];
      break;
    default:
      result = hrTime[0] * 1000000000 + hrTime[1];
  }

  return result.toFixed(6);
};


/**
 * @param {function()} fn
 */
now.timeFnExecution = (fn, args) => {
  let start_time = Date.now();
  const time = process.hrtime();
  let result = fn(args);
  const diff = process.hrtime(time);
  let end_time = Date.now();

  let duration_millis = (diff[0] * 1e9 + diff[1]) / 1000000;

  return {
    timed: {
      start_time,
      end_time,
      duration_millis,
      fn: fn
    },
    return: result
  };
};


/**
 * @param {function(args)} fn
 */
now.timeFnExecutionAsync = async (fn, args) => {
  let start_time = Date.now();
  const time = process.hrtime();
  let result = await Promise.resolve(fn(args));
  const diff = process.hrtime(time);
  let end_time = Date.now();

  let duration_millis = (diff[0] * 1e9 + diff[1]) / 1000000;


  return {
    timed: {
      start_time,
      end_time,
      duration_millis,
      fn: fn
    },
    return: result
  };
};

module.exports = now;