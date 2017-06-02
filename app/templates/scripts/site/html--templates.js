const colors = require('colors'); // pretty console output;
const file = require('file'); // traverse the file system;
const fs = require('fs'); // write to the file system;
const pug = require('pug'); // convert Pug into HTML;
const util = require('../_util'); // Short Documentation shared functions;
const getJsonContent = require('./pug-data--content'); // component content (stored as a JSON object);
const pugSource = 'src/templates'; // Pug files to compile;
const htmlDestination = 'dist/html'; // where the compiled Pug will be saved;

let jsonContent = [];

module.exports = () => {
  jsonContent = getJsonContent();

  // create the destination folders (they might not exist yet);
  util.makeFolders(htmlDestination.split('/'));

  // convert Pug ’page’ files (src) into HTML files (dist);
  file.walkSync(pugSource, parseFolder);
};



//



function parseFolder (folder, dirs, files) {
  (files.length) && files.forEach((folderFile) => {
    // if this is a Pug file (not everything in the folder is a Pug file);
    if (folderFile.split('.').pop().toLowerCase() === 'pug' && folderFile.indexOf('_') !== 0 && folderFile.indexOf('index') !== 0) {
      // convert the Pug file path into an HTML file path (our destination);
      const htmlPath = (folder + '/' + folderFile.replace('.pug', '.html')).replace(pugSource, '');

      // compile Pug into HTML;
      const html = pug.renderFile(folder + '/' + folderFile, {
        pretty: true,
        json: jsonContent
      });

      const filename = htmlPath.split('/').slice(-1)[0];
      const dest = htmlDestination + '/' + filename;

      // write the HTML to file;
      fs.writeFileSync(dest, html);

      console.log(dest.green, 'page was created.');
    }
  });
}
