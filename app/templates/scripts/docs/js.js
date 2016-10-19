const colors = require('colors'); // pretty console output;
const browserify = require('browserify'); // allow require() statements in JavaScript;
const fs = require('fs'); // write to the file system;
const util = require('../util'); // Short Documentation utility functions;

module.exports = jsRender;



//



function jsRender (jsFileInput, jsFileOutput) {
  const destinationFolder = jsFileOutput.split('/');

  // remove the filename (we don't want a folder named 'site.js');
  destinationFolder.pop();

  // create the destination folder (so FS doesn't error when writing the generated CSS file);
  util.makeFolders(destinationFolder);

  // compile es6 JavaScript;
  browserify(jsFileInput)
    .transform('babelify', {
      presets: [
        'es2015'
      ]
    })
    .bundle()
    .pipe(fs.createWriteStream(jsFileOutput));

  console.log(jsFileOutput.green, 'file was created from', jsFileInput.green);
}
