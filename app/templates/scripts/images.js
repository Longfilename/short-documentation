const colors = require('colors'); // pretty console output;
const file = require('file'); // traverse the file system;
const copy = require('./copy');
const util = require('./util');

module.exports = function () {
  file.walkSync('src/components', parseFolder);
};

function parseFolder (currentFolder, dirs, files) {
  const folderArray = currentFolder.split('/');

  // if this folder is an images folder;
  if (folderArray.pop() === 'images') {
    // then that means the folder above it is the component folder;
    const component = folderArray.pop();
    const srcFolder = `src/components/${ component }/images`;
    const distFolder = `dist/images/${ component }`

    // create the destination folders;
    util.makeFolders(distFolder.split('/'));

    // copy the component images to the dist folder;
    copy(srcFolder, distFolder);
  }
}
