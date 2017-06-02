const colors = require('colors'); // pretty console output;
const file = require('file'); // traverse the file system;
const fs = require('fs'); // write to the file system;
const pug = require('pug'); // convert Pug into HTML;
const util = require('../_util'); // Short Documentation shared functions;
const jsonContent = require('./pug-data--index'); // component content (stored as a JSON object);
const pugSource = 'src/templates/index.pug'; // Pug files to compile;
const folderDestination = 'dist'; // where the compiled Pug will be saved;
const fileDestination = folderDestination + '/index.html'; // compilation output of pugSource;

module.exports = function () {
  // create the destination folders (they might not exist yet);
  util.makeFolders(folderDestination.split('/'));

  // create an index file of the all the pages;
  createIndex(pugSource, fileDestination);
};



//



function createIndex (src, dest) {
  // compile Pug into HTML;
  const html = pug.renderFile(src, {
    pretty: true,
    json: jsonContent
  });

  // write the HTML to file;
  fs.writeFileSync(dest, html);

  console.log(dest.green, 'page was created.');
}
