const scss = require('./scss');
const ts = require('./ts');
const images = require('./images');
const html = require('./html');
const util = require('./util');

const watchConfig = {
  images: {
    path: 'src/components/**/images/*',
    command: images
  },
  scss: {
    path: ['src/components/**/*.scss', 'src/scss/**/*.scss'],
    command: scss
  },
  ts: {
    path: ['src/components/**/*.ts', 'src/ts/**/*.ts'],
    command: ts
  },
  html: {
    path: ['src/components/**/*.jade', 'src/templates/**/*.jade', 'src/components/**/*.json'],
    command: html
  }
};

module.exports = function () {
  util.watch(watchConfig);
};
