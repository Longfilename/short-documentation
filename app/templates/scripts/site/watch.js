const util = require('../_util'); // Short Documentation shared functions;

// import all site build scripts;
const scss = require('./scss');
const ts = require('./ts');
const images = require('./images');
const html = require('./html');

module.exports = () => {
  util.watch({
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
      path: ['src/components/**/*.pug', 'src/templates/**/*.pug', 'src/components/**/*.json'],
      command: html
    }
  });
};
