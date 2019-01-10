'use strict';

const fs = require('fs-extra');
const path = require('path');
const Validator = require('jsonschema').Validator;
const schemes = require('./schemes');

const Task = require('../integration/task');

module.exports = {

  /**
   * 
   * @param {string} task_path 
   */
  isValidTaskProject(task_path, manifest) {
    if (typeof task_path !== 'string') {
      return {
        error: 'ERROR: "task_path" must be a string'
      };
      // throw new Error(`ERROR: "task_path" must be a string`);
    }

    let manifestPath = path.join(task_path, 'config', 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
      return {
        error: `Task "${task_path}" does not seem to be a rallf Task: 'config/manifest.json' is missing`
      };
      // throw new Error(`Task "${task_path}" does not seem to be a rallf Task: 'config/manifest.json' is missing`);
    }


    let validManifest = this.validManifest(manifest);
    if (validManifest.errors) {
      for (let error of validManifest.errors) {
        throw new Error(`Task ${task_path} manifest is invalid: \n ${error.stack}`);
      }
    }

    return true;
  },

  /**
   * 
   * @param {any} manifest 
   */
  validManifest(manifest) {
    const vali = new Validator();
    const instance = manifest;
    const schema = schemes.manifest;
    let validation = vali.validate(instance, schema);

    if (validation.errors) return { valid: false, errors: validation.errors };

    return true;
  },

  checkExportToBeTask(export_, manifest) {
    const isTaskInstance = export_.constructor.prototype.isPrototypeOf(Task);
    if (!isTaskInstance) {
      throw new Error(`ERROR: Exported function in task ${manifest.name} is not extending Task`);
    }
  },

  hasMethod(object, method_name) {
    return (
      object &&
      method_name in object &&
      typeof object[method_name] === 'function'
    );
  }

};