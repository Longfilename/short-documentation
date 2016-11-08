const scss = require('./scss');
const ts = require('./ts');
const html = require('./html');
const util = require('../_util'); // Short Documentation shared functions;

const watchConfig = {
  scss: {
    path: 'src/docs/**/*.scss',
    command: scss
  },
  ts: {
    path: 'src/docs/**/*.ts',
    command: ts
  },
  html: {
    path: ['src/docs/**/*.jade', 'src/components/**/*.json', 'src/**/README.md'],
    command: html
  }
};

module.exports = () => {
  util.watch(watchConfig);
};
