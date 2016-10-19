const colors = require('colors'); // pretty console output;
const file = require('file'); // traverse the file system;
const fs = require('fs'); // write to the file system;
const jade = require('jade'); // convert Jade into HTML;
const scssToJson = require('scss-to-json'); // convert SCSS vars into JSON content;

const getNavObject = require('./html--nav.js');
const getDesignPages = require('./html--nav-design.js');

const nav = getNavObject();
const docsDestination = 'dist/docs';

module.exports = renderDesignPages;



//



function renderDesignPages () {
  const pages = getDesignPages;

  pages.map((page) => {
    createDesignPage(page)
  });
}

function createDesignPage (page) {
  const jadeFilepath = page.jade;
  const htmlFilename = page.url;
  const htmlFilepath = docsDestination + '/' + htmlFilename;
  const renderedHTML = jade.renderFile(jadeFilepath, {
    pretty: true,
    nav: nav,
    title: 'src/scss/' + page.scss,
    scssVariables: scssToJson('src/scss/' + page.scss)
  });

  fs.writeFile(htmlFilepath, renderedHTML);

  console.log(htmlFilepath.green, 'page was created from', jadeFilepath.green);
}
