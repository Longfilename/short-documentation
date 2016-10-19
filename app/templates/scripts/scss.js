const colors = require('colors'); // pretty console output;
const sass = require('node-sass'); // render CSS from SCSS;
const postcss = require('postcss'); // convert valid CSS into vendor prefixed CSS;
const autoprefixer = require('autoprefixer'); // defines which vendor prefixes to use;
const fs = require('fs'); // write to the file system;
const util = require('./util');
const scssFileSource = 'src/scss/site.scss'; // source CSS file;
const scssFileDestination = 'dist/css/site.css'; // destination CSS file;
const scssFolderDestination = scssFileDestination.split('/'); // destination folder (for folder creation before file creation);

module.exports = function () {
  // remove the last item in the path array (the filename);
  scssFolderDestination.pop();

  // create the destination folders;
  util.makeFolders(scssFolderDestination);

  // compile the SCSS;
  const renderedScss = sass.renderSync({
    file: scssFileSource,
    includePaths: ['./node_modules'],
    outputStyle: 'compressed'
  });

  // run compiled Sass through a prefixer;
  postcss([autoprefixer({
      browsers: ['> 5% in US', 'ie >= 9'],
      cascade: false
    })])
    .process(renderedScss.css.toString())
    .then((result) => {
      result.warnings().forEach((warn) => {
        console.warn(warn.toString());
      });

      // write the compiled and prefixed CSS to a file;
      fs.writeFileSync(scssFileDestination, result.css);

      console.log(scssFileDestination.green, 'file was created from', scssFileSource.green);
    });
};
