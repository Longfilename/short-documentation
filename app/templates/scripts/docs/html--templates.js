const colors = require('colors'); // pretty console output;
const file = require('file'); // traverse the file system;
const fs = require('fs'); // write to the file system;
const fm = require('front-matter'); // read YAML at the beginning of Markdown files;
const jade = require('jade'); // convert Jade into HTML;
const MarkdownIt = require('markdown-it'); // convert Markdown into HTML;
const scssToJson = require('scss-to-json'); // convert SCSS vars into JSON content;
const filenames = require('./html--filenames.js');

const util = require('../util'); // Short Documentation utility functions;
const getNavObject = require('./html--nav.js');

const nav = getNavObject();
const docsDestination = 'dist/docs';

module.exports = renderTemplates;



//



function renderTemplates () {
  const templates = getReadmeData('src/templates');

  // build all template pages (IFRAME view is built view npm run build - which runs before this documentation task);
  templates.map((template) => {
    createTemplatePage(template);
  });
}

// parse folders looking for readme.md files (to indicate the folder should be read by the documentation app);
function getReadmeData (folderToParse) {
  // data object to return;
  // this will be the collection of components/templates with documentation readme files;
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
      if (currentFile === 'readme.md') {
        const contents = fs.readFileSync(currentFolder + '/' + currentFile, 'utf-8'); // if not UTF-8, then a stream is returned;
        const fmContents = fm(contents); // separate the YAML from the Markdown;

        // return a folder object (fit for both components and templates);
        folderData.push({
          folder: currentFolder.split('/').pop(),
          markdown: fmContents.body,
          yaml: fmContents.attributes
        });
      }
    });
  }
}

function createTemplatePage (template) {
  const jadeFilepath = 'src/docs/page__template.jade';
  const htmlFilename = filenames.templatePageName(template.folder);
  const htmlFilepath = docsDestination + '/' + htmlFilename;
  const markdownIt = new MarkdownIt();
  const renderedMarkdown = markdownIt.render(template.markdown);
  const renderedHTML = jade.renderFile(jadeFilepath, {
    pretty: true,
    folder: template.folder,
    pages: template.yaml.pages,
    markdown: renderedMarkdown,
    nav: nav
  });

  fs.writeFile(htmlFilepath, renderedHTML);

  console.log(htmlFilepath.green, 'page was created from', jadeFilepath.green);
}
