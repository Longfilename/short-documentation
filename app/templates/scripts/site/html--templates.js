const colors = require('colors'); // pretty console output;
const file = require('file'); // traverse the file system;
const fs = require('fs'); // write to the file system;
const jade = require('jade'); // convert Jade into HTML;
const util = require('./util');
const jsonContent = require('./jade-data--content'); // component content (stored as a JSON object);
const jadeSource = 'src/templates'; // Jade files to compile;
const htmlDestination = 'dist/html'; // where the compiled Jade will be saved;

module.exports = function () {
  // create the destination folders (they might not exist yet);
  util.makeFolders(htmlDestination.split('/'));

  // convert Jade ’page’ files (src) into HTML files (dist);
  file.walkSync(jadeSource, parseFolder);
};



//



function parseFolder (folder, dirs, files) {
  (files.length) && files.forEach((folderFile) => {
    // if this is a Jade file (not everything in the folder is a Jade file);
    if (folderFile.split('.').pop().toLowerCase() === 'jade' && folderFile.indexOf('_') !== 0 && folderFile.indexOf('index') !== 0) {
      // convert the Jade file path into an HTML file path (our destination);
      const htmlPath = (folder + '/' + folderFile.replace('.jade', '.html')).replace(jadeSource, '');

      // compile Jade into HTML;
      const html = jade.renderFile(folder + '/' + folderFile, {
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
