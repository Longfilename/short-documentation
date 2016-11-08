const colors = require('colors'); // pretty console output;

module.exports = {
  makeFolders: makeFolders,
  scss: scss,
  ts: ts,
  watch: watch
};

// take an array (representing a path) and create the folders;
function makeFolders (pathArray) {
  const fs = require('fs'); // write to the file system;
  const colors = require('colors'); // pretty console output;
  const mkdirp = require('mkdirp'); // create folders;

  if (pathArray.length) {
    let folder = '';
    let createFolder = true;

    pathArray.forEach((newFolder) => {
      folder = folder + newFolder + '/';

      try {
        if (fs.lstatSync(folder).isDirectory()) {
          createFolder = false;
        }
      } catch (e) {
        // folder did not exist, need to create;
      }

      mkdirp.sync(folder, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    });

    if (createFolder) {
      console.log(folder.green, 'folder was created.');
    }
  }
}

// doc and site SCSS rendering;
function scss (scssInput, scssOutput) {
  const sass = require('node-sass'); // render CSS from SCSS;
  const postcss = require('postcss'); // convert valid CSS into vendor prefixed CSS;
  const autoprefixer = require('autoprefixer'); // defines which vendor prefixes to use;
  const fs = require('fs'); // write to the file system;

  // output directory (used to create the folder structure);
  const destinationFolder = scssOutput.split('/');

  // remove the last item in the path array (the filename);
  // we don't want a folder named 'site.css';
  destinationFolder.pop();

  // create the destination folder;
  // so FS doesn't error when writing the generated CSS file;
  makeFolders(destinationFolder);

  // compile SCSS into CSS;
  sass.render({
    file: scssInput,
    includePaths: ['./node_modules'],
    outputStyle: 'compressed'
  }, (err, result) => {
    if (err) {
      console.error('error on SCSS rendering.');

      return console.error(err);
    } else {
      // run compiled SCSS through a prefixer for browser support;
      postcss([autoprefixer({
          browsers: ['> 5% in US', 'ie >= 9'],
          cascade: false
        })])
        .process(result.css.toString())
        .then((result) => {
          // tell us of any warnings;
          result.warnings().forEach((warn) => {
            console.warn(warn.toString());
          });

          // write the compiled and prefixed CSS to a file;
          fs.writeFileSync(scssOutput, result.css);

          // tell the world what you just did;
          console.log(scssOutput.green, 'file was created from', scssInput.green);
        });
    }
  });
}

// doc and site JS rendering;
function ts (tsInput, tsOutput) {
  const browserify = require('browserify'); // allow require() statements in JS;
  const tsify = require('tsify'); // convert TS into ES5;
  const fs = require('fs'); // write to the file system;
  const destinationFolder = tsOutput.split('/'); // output directory (used to create the folder structure);

  // remove the last item in the path array (the filename);
  // we don't want a folder named 'docs.js';
  destinationFolder.pop();

  // create the destination folders;
  // so FS doesn't error when writing the generated JS file;
  makeFolders(destinationFolder);

  // compile TypeScript into JavaScript;
  browserify()
    .add(tsInput)
    .plugin('tsify')
    .transform('babelify', {
        presets: [
          'es2015'
        ]
    })
    .transform({ global: true }, 'uglifyify')
    .bundle()
    .pipe(fs.createWriteStream(tsOutput));

  // tell the world what you just did;
  console.log(tsOutput.green, 'file was created from', tsInput.green);
}

function watch (config) {
  const chokidar = require('chokidar'); // watches for file changes;

  // configure watcher for each entry in the config;
  Object.getOwnPropertyNames(config).forEach((val, idx, array) => {
    const watchObj = config[val];

    console.log(watchObj);

    // start the watcher, one watcher per property (html, scss, js, images);
    chokidar
      .watch(watchObj.path, { persistent: true })
      .on('change', (path, stats) => {
        // on change, find out what file was changed;
        const filename = path.split('/').slice(-1).toString();

        // report on the changed file;
        console.log(filename.blue, 'changed, rebuilding.');

        // run the rebuilding command;
        watchObj.command();
      });

    // tell the world what is going on;
    console.log(val.blue, 'watcher has been started.');
  });
}
