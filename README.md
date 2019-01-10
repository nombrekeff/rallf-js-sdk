
<!-- Docs links -->
[docs:manifest]: https://github.com/RobotUnion/rallf-js-sdk/wiki/Manifest
[docs:cli]: https://github.com/RobotUnion/rallf-js-sdk/wiki/CLI---runner
[docs:Task]: https://github.com/RobotUnion/rallf-js-sdk/wiki/Integration---Task
[docs:Skill]: https://github.com/RobotUnion/rallf-js-sdk/wiki/Integration---Skill
[docs:Running]: https://github.com/RobotUnion/rallf-js-sdk/wiki/Running-Tasks
[docs:Creating]: https://github.com/RobotUnion/rallf-js-sdk/wiki/Creating-Tasks
[docs:GettingStarted]: https://github.com/RobotUnion/rallf-js-sdk/wiki/Getting-Started


[license-img]: https://img.shields.io/github/license/RobotUnion/rallf-js-sdk.svg?style=flat-square
[github-link]: https://github.com/RobotUnion/rallf-js-sdk

[rallf-status-img]: https://img.shields.io/website-up-down-green-red/https/api.rallf.com.svg?label=site&style=flat-square
[rallf-link]: https://rallf.com

[npm-version-img]: https://img.shields.io/npm/v/rallf-js-sdk.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/rallf-js-sdk

[gh-pkg-version-img]: https://img.shields.io/github/package-json/v/RobotUnion/rallf-js-sdk.svg?style=flat-square
[npm-deps-img]: https://img.shields.io/david/RobotUnion/rallf-js-sdk.svg?style=flat-square

[wiki-img]: https://img.shields.io/badge/wiki-github-green.svg?longCache=true&style=flat-square
[wiki-link]: https://github.com/RobotUnion/rallf-js-sdk/wiki


<p align="center">
  <a href="http://rallf.com">
    <img src="https://robotunion.net/wp-content/uploads/2016/10/CREAR-BOT3.png" height="200">
  </a>
</p>
<h1 align="center">RALLF Node.js SDK</h1>

<div align="center">
  <p>Toolset to create, test & deploy <b>Tasks</b> for <a href="https://rallf.com">RALLF</a> <i>(<b>NodeJS</b> Edition)</i></p>
  
[![npm]( https://img.shields.io/npm/v/rallf-js-sdk.svg?style=flat-square)](https://www.npmjs.com/package/rallf-js-sdk) [![GitHub package version](https://img.shields.io/github/package-json/v/RobotUnion/rallf-js-sdk.svg?style=flat-square)](https://github.com/RobotUnion/rallf-js-sdk)
[![License][license-img]][github-link]
[![Website][rallf-status-img]][rallf-link]
[![Dependencies][npm-deps-img]][github-link]
[![wiki][wiki-img]][wiki-link]
  
<!-- Docs: [CLI][docs:cli], [Task][task-docs], [Skill][skill-docs], [Manifest][manifest-docs], [Creating][docs-create], [Running][docs-running] -->

> **Quick Links:**
[`🔗 Getting Started`][docs:GettingStarted]
[`🔗 Creating`][docs:Creating]
[`🔗 Running`][docs:Running]
[`🔗 CLI`][docs:cli]
[`🔗 Manifest`][docs:manifest]
[`🔗 Skill`][docs:Skill]
[`🔗 Task`][docs:Task]
</div>


## Resources
* [Installing](#installing)
* [Getting Started](#getting-started)
* [Wiki](https://github.com/RobotUnion/rallf-sdk/wiki)
* [Examples](examples)

## Installing
* Run `npm install rallf-js-sdk -g` to install the sdk and have access to global [commands]()

## Getting Started
Now you can check the [Getting Started][docs:GettingStarted] guide to start developing 🤖!

<!-- ### Create simple Task
  1. Create an empty folder: `mkdir test-task && cd test-task`
  2. Init a task project with: `rallf-init`  
     2.1. Init will ask some questions
  3. **init** will generate the following some files (_explained below_)
  * `config/manifest.json` - The [Manifest][manifest-docs] holds information about your Task, e.g: name, version, fqtn
  * `mocks/test.task.com/index.js` - [Mocks](https://github.com/RobotUnion/rallf-js-sdk/wiki/Testing:-Mocks) are just the way of testing your tasks locally, without a [Incubator]()
  * `robots/test-robot/` - [Robots]() TODO...
  * `src/main.js` - This is the main file of the task, the one that will get executed

### Create simple Skill
1. Follow the steps above until 2.
2. In step 2 pass `--skill` option, this will generate a skill template for you
3. It will create the same structure as above.

## Running 
### Running a task
  * `npm start`
  * `rallf-runner run -r test-robot --input {}`    
    
### Running a Skill
  * `npm run run:getTitle`
  * `rallf-runner run -r test-robot --method getTitle --input '{}'`    
      * If method is passed it will asume it is a skill and will run that method


You will know if everything went OK  .

Now you can have fun! 🤖 -->

## Found a bug?
If you found a bug please leave us an issue.
* Make sure you check the [contributing guidelines](https://github.com/RobotUnion/rallf-js-sdk/blob/master/.github/CONTRIBUTING.md) before.
* Make sure that issue has not been reported

<!-- {"jsonrpc": "2.0", "method": "run-method", "params": { "method": "followUser", "username":"santoslluis" }, "id": "test"} -->
