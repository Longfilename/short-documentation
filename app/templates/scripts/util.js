const fs = require('fs'); // write to the file system;
const colors = require('colors'); // pretty console output;
const mkdirp = require('mkdirp'); // create folders;

module.exports = {
  // a few tasks require the destination folder to be already present;
  // this function will take an array, representing a path, and create the folders;
  makeFolders: (pathArray) => {
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
};
