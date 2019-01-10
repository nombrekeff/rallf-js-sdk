// Here should try running some tasks end to end  
const child_process = require('child_process');


let p = child_process.spawn('node', ['bin/runner.js', 'run', '-t', 'examples/basic-example', '-r', 'robot-test']);

p.stdout.pipe(process.stdout);
p.stderr.pipe(process.stderr);

p.on('error', process.exit.bind(1));
