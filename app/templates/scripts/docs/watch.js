const util = require('../_util'); // Short Documentation shared functions;

// import documentation build scripts;
const scss = require('./scss');
const ts = require('./ts');
const html = require('./html');

module.exports = () => {
  util.watch({
    scss: {
      path: 'src/docs/**/*.scss',
      command: scss
    },
    ts: {
      path: 'src/docs/**/*.ts',
      command: ts
    },
    html: {
      path: ['src/**/*.pug', 'src/**/*.json', 'src/**/README.md'],
      command: html
    }
  });
};
