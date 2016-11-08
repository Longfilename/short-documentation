const clean = require('./clean');
const scss = require('./scss');
const ts = require('./ts');
const images = require('./images');
const html = require('./html');
const server = require('./server');
const watch = require('./watch');

module.exports = {
  clean: clean,
  scss: scss,
  ts: ts,
  images: images,
  html: html,
  server: server,
  watch: watch
};
