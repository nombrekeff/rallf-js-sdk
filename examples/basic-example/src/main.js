const rallf = require('../../../');
// const rallf = require('rallf-js-sdk'); 

class BasicExample extends rallf.Task {
  constructor() {
    super();
    this.firefox = null;
  }

  async warmup() {
    this.logger.debug('warmup');
    this.firefox = await this.devices.get('firefox');
    await this.firefox.get('https://github.com');
  }

  async start(input) {
    this.logger.debug(this.fqtn + ' started');
    return 'started';
  }

  async getTitle(input) {
    return await this.firefox.getTitle();
  }

  async cooldown() {
    this.logger.debug('cooldown');
    await this.devices.quit(this.firefox);
  }
}
module.exports = BasicExample;
