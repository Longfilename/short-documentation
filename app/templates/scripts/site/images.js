const colors = require('colors'); // pretty console output;
const file = require('file'); // traverse the file system;
const ncp = require('ncp').ncp; // recursive file copy;
const util = require('../_util'); // Short Documentation shared functions;

module.exports = () => {
  file.walkSync('src/components', parseFolder);
};



//



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
    ncp(srcFolder, distFolder, (err) => {
      if (err) {
        return console.error(err);
      }

      console.log(srcFolder.green, 'images were copied to', distFolder.green);
    });
  }
}
