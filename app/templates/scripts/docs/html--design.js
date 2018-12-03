const colors = require('colors'); // pretty console output;
const file = require('file'); // traverse the file system;
const fs = require('fs'); // write to the file system;
const pug = require('pug'); // convert Pug into HTML;
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
function createDesignPage(page) {
  const pugFilepath = page.pug;
  const htmlFilename = page.url;
  const htmlFilepath = docsDestination + '/' + htmlFilename;
  const renderedHTML = pug.renderFile(pugFilepath, {
    pretty: true,
    nav: nav,
    title: 'src/scss/' + page.scss,
    scssVariables: page.scss ? scssToJson('src/scss/' + page.scss) : {},
    css: fs.readFileSync('dist/css/site.css', 'utf-8')
  });

  // build the design page;
  fs.writeFileSync(htmlFilepath, renderedHTML);

  // tell the world what we did;
  console.log(htmlFilepath.green, 'page was created from', pugFilepath.green);
}