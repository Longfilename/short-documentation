// import all documentation build scripts;
const scss = require('./scss.js');
const ts = require('./ts.js');
const html = require('./html.js');
const watch = require('./watch');

// export them to be run from ../start.js;
module.exports = {
  scss: scss,
  ts: ts,
  html: html,
  watch: watch
};
