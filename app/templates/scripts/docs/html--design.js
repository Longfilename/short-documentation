const colors = require('colors'); // pretty console output;
const file = require('file'); // traverse the file system;
const fs = require('fs'); // write to the file system;
const jade = require('jade'); // convert Jade into HTML;
const scssToJson = require('scss-to-json'); // convert SCSS vars into JSON content;
const getDesignPages = require('./html--nav-design.js'); // Short Documentation design navigation;
const getNavObject = require('./html--nav.js'); // returns Short Documentation navigation object;
const nav = getNavObject(); // get Short Documentation nav object;
const docsDestination = 'dist/docs'; // destination for docs;

module.exports = () => {
  const designs = getDesignPages;

  // build all docs design pages;
  designs.map((design) => {
    createDesignPage(design)
  });
};



//



// create the documentation design pages;
function createDesignPage (page) {
  const jadeFilepath = page.jade;
  const htmlFilename = page.url;
  const htmlFilepath = docsDestination + '/' + htmlFilename;
  const renderedHTML = jade.renderFile(jadeFilepath, {
    pretty: true,
    nav: nav,
    title: 'src/scss/' + page.scss,
    scssVariables: page.scss ? scssToJson('src/scss/' + page.scss) : {}
  });

  // build the design page;
  fs.writeFile(htmlFilepath, renderedHTML);

  // tell the world what we did;
  console.log(htmlFilepath.green, 'page was created from', jadeFilepath.green);
}
