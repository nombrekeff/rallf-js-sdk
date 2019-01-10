const { Runner } = require('../src/lib');
const { Task } = require('../src/integration');
const fs = require('fs-extra');

jest.setTimeout(120e3);

let cwd = process.cwd();

fdescribe('Runner', () => {

  const runner = new Runner();

  // beforeEach(_ => {
  //   process.chdir(cwd);
  // })


  it(`should be defined`, () => {
    expect(Runner).toBeDefined();
  });

  const isMethodAFunction = (method_name) => () => expect(typeof Runner.prototype[method_name]).toEqual('function');

  it(`should contain method: runTask`, isMethodAFunction('runTask'));

  it(`should throw error if anything but a task is passed to: runTask`, async () => {
    try {
      await runner.runTask({});
    } catch (e) {
      expect(e).toEqual({
        error: 'Exported class must extend from \"Task\"'
      });
    }
  });

  it(`should throw error if path is not a task`, () => {
    expect(() => runner.getManifest('ads').error).toBeDefined();
  });

  it(`should not throw error if path is a task`, () => {
    expect(() => runner.getManifest('./examples/basic-example')).not.toThrowError();
  });

  it(`.getManifest should return correct data`, () => {
    let mani = fs.readJSONSync('./examples/basic-example/config/manifest.json');
    expect(runner.getManifest('./examples/basic-example')).toEqual(mani);
  });

  it(`.getTask should throw error if bad task passed`, () => {
    expect(() => runner.createTask('./examples/non-existing', {})).toThrowError();
  });

  it(`.getTask should return a task`, () => {
    process.chdir(cwd);
    let manifest = runner.getManifest('./examples/basic-example');
    let mock = runner.getMock('./examples/basic-example', 'test');
    let task = runner.createTask('./examples/basic-example', manifest, mock);
    expect(task.__proto__.constructor.__proto__.name).toEqual('Task');
  });

  it(`should run "basic task" and return 'finished'`, async () => {
    process.chdir(cwd);
    let manifest = runner.getManifest('./examples/basic-example');
    let mock = runner.getMock('./examples/basic-example', 'test');
    let task = runner.createTask('./examples/basic-example', manifest, mock);
    let res = await runner.runMethod(task, 'start', {}, false);
    expect(res.result).toEqual('started');
  });
});