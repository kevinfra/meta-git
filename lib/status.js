const chalk = require('chalk');
const debug = require('debug')('meta-git:status');
const parse = require('./parseError');
const spawn = require('child_process').spawn;
const toReadStream = require('spawn-to-readstream');

module.exports = (cb) => {

  debug(`git status for ${process.cwd()}`);

  toReadStream(spawn('git', ['status'], { env: process.env }))
    .on('error', parse.bind(this, process.cwd()))
    .on('end', () => {
      console.log(`git status ${process.cwd()} complete`);
      cb();
    }).on('data', (data) => {
      console.log(`\n${chalk['green'](process.cwd())}\n${data.toString()}\n`);
    });

};