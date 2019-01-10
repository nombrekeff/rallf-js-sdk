const { Task } = require('../../../');

class BasicExample extends Task {
  constructor() {
    super();
    this.firefox = null;
  }

  async warmup() {
    this.logger.debug('@ warmup');
  }

  async start(input) {
    this.logger.debug('@ started');
    this.logger.debug('& started');
    this.logger.debug('With robot: %');

    // // await this.firefox.get('https://github.com');
    // this.robot.ensureFile('data.json');
    // this.robot.saveJSON('data.json', { test: 'asdads' });

    // this.robot.ensureFile('data.txt');
    // this.robot.saveFile('data.txt', 'This is a test text file', {});

    
    // // Or you can do
    // this.robot.createFile('data.json', { test: 'asdads' });


    // this.logger.debug('Data saved: ', data);
    return 'finished';
  }

  async cooldown() {
    this.logger.debug('cooldown');
    await this.devices.quit(this.firefox);
  }
}
module.exports = BasicExample;
