const colors = require('colors'); // pretty console output;
const file = require('file'); // traverse the file system;
const fs = require('fs'); // write to the file system;
const jade = require('jade'); // convert Jade into HTML;
const util = require('./util');
const jsonContent = require('./jade-data--index'); // component content (stored as a JSON object);
const jadeSource = 'src/templates/index.jade'; // Jade files to compile;
const folderDestination = 'dist'; // where the compiled Jade will be saved;
const fileDestination = folderDestination + '/index.html'; // compilation output of jadeSource;

module.exports = function () {
  // create the destination folders (they might not exist yet);
  util.makeFolders(folderDestination.split('/'));

  // create an index file of the all the pages;
  createIndex(jadeSource, fileDestination);
};


//



function createIndex (src, dest) {
  // compile Jade into HTML;
  const html = jade.renderFile(src, {
    pretty: true,
    json: jsonContent
  });

  // write the HTML to file;
  fs.writeFile(dest, html);

  console.log(dest.green, 'page was created.');
}
