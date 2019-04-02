const colors = require('colors'); // pretty console output;
const rimraf = require('rimraf'); // delete folders recursively;
const distFolder = 'dist';

module.exports = function () {
  // delete the distribution folder;
  // now we have a clean path to build everything;
  rimraf.sync(distFolder);

  console.log(distFolder.red, 'was purged.');
};
