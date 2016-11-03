const colors = require('colors'); // pretty console output;
const browserify = require('browserify'); // allow require() statements in JS;
const tsify = require('tsify'); // convert TS into ES5;
const fs = require('fs'); // write to the file system;
const util = require('../util');
const jsFileSource = 'src/docs/js/docs.ts';
let jsFileDestination = 'dist/docs/docs.js'; // output file;
let jsFolderDestination = jsFileDestination.split('/'); // output directory (used to create the folder structure);

module.exports = function () {
  // remove the last item in the path array (the filename);
  jsFolderDestination.pop();

  // create the destination folders;
  util.makeFolders(jsFolderDestination);

  // compile TypeScript into JavaScript;
  browserify()
    .add(jsFileSource)
    .plugin('tsify')
    .transform('babelify', {
        presets: [
          'es2015'
        ]
    })
    .transform({ global: true }, 'uglifyify')
    .bundle()
    .pipe(fs.createWriteStream(jsFileDestination));

  console.log(jsFileDestination.green, 'file was created from', jsFileSource.green);
};
