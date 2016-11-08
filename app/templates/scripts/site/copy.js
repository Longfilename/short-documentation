const colors = require('colors'); // pretty console output;
const ncp = require('ncp').ncp; // recursive file copy;
const util = require('../_util'); // Short Documentation shared functions;

module.exports = function (filesIn, filesOut) {
  // create the destination folders;
  util.makeFolders(filesOut.split('/'));

  // copy the images from the source to the destination;
  ncp(filesIn, filesOut, (err) => {
    if (err) {
      return console.error(err);
    }

    console.log(filesIn.green, 'images were copied to', filesOut.green);
  });
};
