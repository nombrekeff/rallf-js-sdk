#!/usr/bin/env node


const program = require('commander');
const path = require('path');
const clc = require('cli-color');
const fs = require('fs-extra');
const AdmZip = require('adm-zip');
const logging = require('../src/lib/logging');
const checker = require('../src/lib/checker');
const checkVersion = require('./version-check');
const pkg = require('../package.json');
const Runner = require('../src/lib/runner');

const INCLUDED_FILES = [
  'config/manifest.json',
  'src/',
  'package.json',
];


program.version(pkg.version);
program.option('--nvc', 'Don\'t check version', false);
program.option('-i, --input-path <input_path>', 'Specify an input path', path.join(process.cwd()));
program.option('-o, --output-path <output_path>', 'Specify an outut path', path.join(process.cwd(), 'output'));

checkVersion(process.argv.includes('--nvc'))
  .then(goAhead)
  .catch(goAhead);

function goAhead() {
  /**
  * @param {*} colorName 
  * @param {*} str 
  * @param {*} colorEnabled 
  */
  function color(colorName, str, colorEnabled = true) {
    if (colorEnabled) {
      try {
        str = clc[colorName](str);
      } catch (error) { }
    }

    return str;
  }

  /**
   * @param {*} byteLen 
   */
  function getByteSize(byteLen) {
    let size = byteLen / 1000000.0;
    let label = ' mb';

    if (size < 0.01) {
      size = byteLen;
      label = ' bytes';
    } else {
      size = byteLen / 1000000.0;
      label = ' mb';
    }

    return size + label;
  }

  program.action((cmd) => {
    let exists = fs.existsSync(cmd.inputPath);
    if (!exists) {
      logging.log('error', 'Input path does not exists: ' + cmd.inputPath, null, 'packager');

      return process.exit(1);
    }

    // Check if is valid task
    const rallfRunner = new Runner();
    const manifest = rallfRunner.getManifest(cmd.inputPath);

    let valid = checker.isValidTaskProject(cmd.inputPath, manifest);
    if (valid.error) {
      logging.log('error', valid.error, null, 'packager');

      return process.exit(1);
    }

    let outputPath = path.resolve(cmd.outputPath);

    logging.log('info', 'Packaging task: ' + color('green', `${manifest.fqtn}@${manifest.version}`), null, 'packager');
    logging.log('info', 'Packaging to: ' + color('blueBright', outputPath), null, 'packager');

    logging.log('info', ' ', null, 'packager');
    logging.log('info', 'Checking', null, 'packager');
    let maxWidth = 0;
    for (let fname of INCLUDED_FILES) {
      let filePath = path.join(cmd.inputPath, fname);
      if (!fs.existsSync(filePath)) {
        logging.log('error', '   ' + color('blueBright', filePath) + ' ' + color('red', 'FILE_MISSING'), null, 'packager');

        return process.exit(1);
      }
      if (fname.length > maxWidth) {
        maxWidth = fname.length;
      }

      logging.log('info', '   ' + color('green', '✔') + ' ' + color('blueBright', filePath), null, 'packager');
    }

    logging.log('info', ' ', null, 'packager');
    logging.log('info', 'Zipping', null, 'packager');
    let zip = new AdmZip();
    for (let fname of INCLUDED_FILES) {
      let filePath = path.join(cmd.inputPath, fname);
      let stats = fs.lstatSync(filePath);

      let namePadded = fname + ' '.repeat(maxWidth - fname.length);
      if (stats.isFile()) {
        let fileBuffer = fs.readFileSync(filePath);
        logging.log('info', '   ' + color('blueBright', namePadded) + ' ' + getByteSize(fileBuffer.byteLength), null, 'packager');
        zip.addFile(fname, fileBuffer);
      } else {
        let files = fs.readdirSync(filePath);
        logging.log('info', '   ' + color('blueBright', namePadded), null, 'packager');
        files.forEach((file) => {
          let fileBuffer = fs.readFileSync(path.join(filePath, file));
          let namePadded2 = file + ' '.repeat(maxWidth - file.length - 2);

          logging.log('info', '     ' + color('blueBright', namePadded2) + ' ' + getByteSize(fileBuffer.byteLength), null, 'packager');
          zip.addFile(fname, fileBuffer);
        });
      }
    }

    let zipPath = path.join(outputPath, manifest.fqtn + '.zip');
    zip.writeZip(zipPath);

    let zipSize = zip.toBuffer().byteLength;
    logging.log('info', ' ', null, 'packager');
    logging.log('info', 'Total Packaged Size: ' + getByteSize(zipSize), null, 'packager');


    logging.log('info', ' ', null, 'packager');
    logging.log('info', 'Package available at: ' + color('blueBright', zipPath), null, 'packager');
    logging.log('info', 'Use (' + color('blackBright', 'rallf-publish') + ') to publish it to rallf market', null, 'packager');
  });

  program.parse(process.argv);
}