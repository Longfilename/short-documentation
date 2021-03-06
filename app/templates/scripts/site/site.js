// import all site build scripts;
const clean = require('./clean');
const scss = require('./scss');
const ts = require('./ts');
const binaries = require('./binaries');
const html = require('./html');
const server = require('./server');
const watch = require('./watch');

// export them to be run from ../start.js;
module.exports = {
  clean: clean,
  scss: scss,
  ts: ts,
  binaries: binaries,
  html: html,
  server: server,
  watch: watch
};
