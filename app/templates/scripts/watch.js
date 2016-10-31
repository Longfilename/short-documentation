const chokidar = require('chokidar'); // watches for file changes;
const scss = require('./scss');
const js = require('./js');
const copy = require('./copy');
const htmlTemplates = require('./html--templates');
const htmlIndex = require('./html--index');
const docs = require('./docs/docs');
const watch = require('./watch');

const config = {
  images: {
    path: 'src/images/**/*',
    command: function () {
      copy('src/images', 'dist/images');
    }
  },
  scss: {
    path: 'src/**/*.scss',
    command: scss,
    docs: docs.scss
  },
  js: {
    path: ['src/**/*.ts'],
    command: js,
    docs: docs.js
  },
  html: {
    path: ['src/**/*.jade', 'src/**/*.json'],
    command: function () {
      htmlTemplates();
      htmlIndex();
    },
    docs: docs.html
  }
};

module.exports = function (startDocs) {
  // configure watcher for each filetype;
  // each file type is a property in the config object;
  // so looping through each property will start a watcher for each file type;
  Object.getOwnPropertyNames(config).forEach((val, idx, array) => {
    const watchObj = config[val];
    const colors = require('colors'); // pretty console output;

    // start the watcher, one watcher per property (html, scss, js, images);
    chokidar
      .watch(watchObj.path, { persistent: true })
      .on('change', (path, stats) => {
        // on change, find out what file was changed;
        const filename = path.split('/').slice(-1).toString();

        // report on the changed file;
        console.log(filename.blue, 'changed, rebuilding.');

        watchObj.command();

        if (startDocs && watchObj.docs) {
          watchObj.docs();
        }
      });

    console.log(val.blue, 'watcher has been started.');
  });
};
