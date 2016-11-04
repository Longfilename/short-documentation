const colors = require('colors'); // pretty console output;
const browserify = require('browserify'); // allow require() statements in JS;
const tsify = require('tsify'); // convert TS into ES5;
const fs = require('fs'); // write to the file system;
const util = require('../util'); // Short Documentation utility functions;
const jsFileSource = 'src/docs/ts/docs.ts'; // input file;
const jsFileDestination = 'dist/docs/docs.js'; // output file;
const jsFolderDestination = jsFileDestination.split('/'); // output directory (used to create the folder structure);

module.exports = () => {
  // remove the last item in the path array (the filename);
  // we don't want a folder named 'docs.js';
  jsFolderDestination.pop();

  // create the destination folders;
  // so FS doesn't error when writing the generated JS file;
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

  // tell the world what you just did;
  console.log(jsFileDestination.green, 'file was created from', jsFileSource.green);
};
