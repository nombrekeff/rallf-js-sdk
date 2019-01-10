'use strict';
const fs = require('fs-extra');
const path = require('path');


/**
 * This class is used from Robot, so all file managments stuff is separated
 * @param {string} cwd 
 */
class RallfFS {
  constructor(cwd = '') {
    this._cwd = path.resolve(cwd) || null;
  }


  /**
   * Save a JSON object to a file
   * @param {string} filepath 
   * @param {object} data 
   * @param {{fs?: object, replacer?: any, spaces?: number | string, EOL?: string}} options?
   */
  saveJSON(filepath, data, options = null) {
    if (!fs.existsSync(this._cwd)) {
      throw new Error('Oopsy, the robot cwd does not exist: ' + this._cwd);
    }

    filepath = path.join(this._cwd, filepath);
    fs.writeJsonSync(filepath, data, options);
  }

  /**
   * Save data to a file
   * @param {string} filepath 
   * @param {any} data 
   * @param {string|{encoding?:string, mode?:string|number, flag?:string}} options?
   */
  saveFile(filepath, data, options = null) {
    if (!fs.existsSync(this._cwd)) {
      throw new Error('Oopsy, the robot cwd does not exist: ' + this._cwd);
    }

    filepath = path.join(this._cwd, filepath);
    fs.writeFileSync(filepath, data, options);
  }

  /**
   * Ensures a file exists, if not it creates it recursively
   * @param {string} filepath 
   */
  ensureFile(filepath) {
    if (!fs.existsSync(this._cwd)) {
      throw new Error('Oopsy, the robot cwd does not exist: ' + this._cwd);
    }

    filepath = path.join(this._cwd, filepath);
    
return fs.ensureFileSync(filepath);
  }

  /**
   * Ensures a dir exists, if not it creates it recursively
   * @param {string} dirpath 
   */
  ensureDir(dirpath) {
    if (!fs.existsSync(this._cwd)) {
      throw new Error('Oopsy, the robot cwd does not exist: ' + this._cwd);
    }

    dirpath = path.join(this._cwd, dirpath);
    
return fs.ensureDirSync(dirpath);
  }

  /**
   * Read data from a file
   * @param {string} filepath 
   * @param {{encoding?:string, flag?:string}} options?
   */
  readFile(filepath, options = null) {
    if (!fs.existsSync(this._cwd)) {
      throw new Error('Oopsy, the robot cwd does not exist: ' + this._cwd);
    }

    filepath = path.join(this._cwd, filepath);
    fs.readFileSync(filepath);
  }

  /**
   * Read JSON from file
   * @param {string} filepath
   * @param {{throws?: boolean, fs?: object, reviver?: any, encoding?: string,flag?: string}} options?
   * @return {object} 
  */
  readJSON(filepath, options = null) {
    if (!fs.existsSync(this._cwd)) {
      throw new Error('Oopsy, the robot cwd does not exist: ' + this._cwd);
    }

    filepath = path.join(this._cwd, filepath);
    
return fs.readJsonSync(filepath, options);
  }

  /**
   * Check if a file or directory exists synchronously
   * @param {string} filepath 
   * @return {boolean}
   */
  existsSync(filepath) {
    filepath = path.join(this._cwd, filepath);
    
return fs.existsSync(filepath);
  }

  /**
   * Check if a file or directory exists asynchronously
   * @param {string} filepath 
   * @param {function (boolean)} callback
   * @return {void}
   */
  exists(filepath, callback) {
    filepath = path.join(this._cwd, filepath);
    fs.exists(filepath, callback);
  }


  /**
   * Create a file even if sub-directories do not exist
   * @param {string} filepath 
   * @param {any} data 
   */
  createFile(filepath, data) {
    fs.createFileSync(filepath);
    fs.writeFileSync(filepath, data);
  }
}

module.exports = RallfFS;