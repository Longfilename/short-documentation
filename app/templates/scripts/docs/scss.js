const colors = require('colors'); // pretty console output;
const sass = require('node-sass'); // render CSS from SCSS;
const postcss = require('postcss'); // convert valid CSS into vendor prefixed CSS;
const autoprefixer = require('autoprefixer'); // defines which vendor prefixes to use;
const fs = require('fs'); // write to the file system;
const util = require('../util'); // Short Documentation utility functions;

module.exports = (scssInput, scssOutput, supportedBrowsers) => {
  // output directory (used to create the folder structure);
  const destinationFolder = scssOutput.split('/');

  // remove the last item in the path array (the filename);
  // we don't want a folder named 'site.css';
  destinationFolder.pop();

  // create the destination folder;
  // so FS doesn't error when writing the generated CSS file;
  util.makeFolders(destinationFolder);

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
          browsers: supportedBrowsers,
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
};
