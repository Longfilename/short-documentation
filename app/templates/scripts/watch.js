const chokidar = require('chokidar'); // watches for file changes;
const scss = require('./scss');
const ts = require('./ts');
const images = require('./images');
const htmlTemplates = require('./html--templates');
const htmlIndex = require('./html--index');
const docs = require('./docs/docs');
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
    command: function (startDocs) {
      htmlTemplates();
      htmlIndex();

      // if docs are running, rerun docs HTML because the site HTML changed;
      if (startDocs) {
        docs.html();
      }
    }
  }
};

module.exports = function (startDocs) {
  // if the docs are running, watch those files too;
  if (startDocs) {
    watchConfig.docsScss = {
      path: 'src/docs/**/*.scss',
      command: docs.scss
    };
    watchConfig.docsTs = {
      path: 'src/docs/**/*.ts',
      command: docs.ts
    };
    watchConfig.docsHtml = {
      path: 'src/docs/**/*.jade',
      command: docs.html
    };
    watchConfig.docsReadme = {
      path: 'src/**/README.md',
      command: docs.html
    };
  }

  // configure watcher for each entry in the config;
  Object.getOwnPropertyNames(watchConfig).forEach((val, idx, array) => {
    const watchObj = watchConfig[val];
    const colors = require('colors'); // pretty console output;

    // start the watcher, one watcher per property (html, scss, js, images);
    chokidar
      .watch(watchObj.path, { persistent: true })
      .on('change', (path, stats) => {
        // on change, find out what file was changed;
        const filename = path.split('/').slice(-1).toString();

        // report on the changed file;
        console.log(filename.blue, 'changed, rebuilding.');

        // run the rebuilding command;
        watchObj.command(startDocs);
      });

    // tell the world what is going on;
    console.log(val.blue, 'watcher has been started.');
  });
};
