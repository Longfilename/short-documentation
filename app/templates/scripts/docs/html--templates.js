const colors = require('colors'); // pretty console output;
const file = require('file'); // traverse the file system;
const fs = require('fs'); // write to the file system;
const fm = require('front-matter'); // read YAML at the beginning of Markdown files;
const jade = require('jade'); // convert Jade into HTML;
const MarkdownIt = require('markdown-it'); // convert Markdown into HTML;
const scssToJson = require('scss-to-json'); // convert SCSS vars into JSON content;
const Prism = require('prismjs'); // syntax highlighter;
const pretty = require('./_pretty'); // beautify the HTML;
const filenames = require('./html--filenames.js'); // Short Documentation utility functions;
const util = require('../util'); // Short Documentation utility functions;
const getNavObject = require('./html--nav.js'); // returns Short Documentation navigation object;
const nav = getNavObject(); // get Short Documentation nav object;
const docsDestination = 'dist/docs'; // destination for docs;

module.exports = () => {
  // parse the readme data for all templates;
  const templates = getReadmeData('src/templates');

  // build all docs template pages;
  templates.map((template) => {
    createTemplatePage(template);
  });
};



//



// parse folders looking for readme files (to indicate the folder should be read by the documentation app);
function getReadmeData (folderToParse) {
  // data object to return;
  // this will be the collection of templates with documentation readme files;
  const folderData = [];

  // go through each folder looking for a readme.md file, and if one is found, record the folder for the documentation;
  file.walkSync(folderToParse, parseFolder);

  return folderData;

  //

  function parseFolder (currentFolder, dirs, files) {
    // only process this folder if it has files;
    (files.length) && files.forEach((currentFile) => {
      // only process this file if it is a readme.md file;
      // not all folders will have readme.md;
      if (currentFile.toLowerCase() === 'readme.md') {
        const contents = fs.readFileSync(currentFolder + '/' + currentFile, 'utf-8');
        const fmContents = fm(contents); // separate the YAML from the Markdown;

        // return a folder object;
        folderData.push({
          folder: currentFolder.split('/').pop(),
          markdown: fmContents.body,
          yaml: fmContents.attributes
        });
      }
    });
  }
}

// create the documentation template pages;
function createTemplatePage (template) {
  const jadeFilepath = 'src/docs/page__template.jade';
  const htmlFilename = filenames.templatePageName(template.folder);
  const htmlFilepath = docsDestination + '/' + htmlFilename;
  const markdownIt = new MarkdownIt();
  const renderedMarkdown = markdownIt.render(template.markdown);
  const jadeConfig = {
    pretty: true,
    folder: template.folder,
    pages: template.yaml.pages,
    markdown: renderedMarkdown,
    renderedHTML: [],
    nav: nav
  };

  // there can be multiple pages for a template;
  // get the source HTML for each to display in the tabs;
  template.yaml.pages.map((page) => {
    const renderedHTML = fs.readFileSync('dist/html/show.html', 'utf-8');
    const prettyHTML = Prism.highlight(renderedHTML, Prism.languages.html);

    // record the pretty HTML;
    jadeConfig.renderedHTML.push(prettyHTML);
  });

  // build the template page;
  fs.writeFile(htmlFilepath, jade.renderFile(jadeFilepath, jadeConfig));

  // tell the world what we did;
  console.log(htmlFilepath.green, 'page was created from', jadeFilepath.green);
}
