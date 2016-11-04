const colors = require('colors'); // pretty console output;
const file = require('file'); // traverse the file system;
const fs = require('fs'); // write to the file system;
const fm = require('front-matter'); // read YAML at the beginning of Markdown files;
const jade = require('jade'); // convert Jade into HTML;
const MarkdownIt = require('markdown-it'); // convert Markdown into HTML;
const scssToJson = require('scss-to-json'); // convert SCSS vars into JSON content;
const Prism = require('prismjs'); // syntax highlighter;
const pretty = require('./_pretty'); // beautify the HTML;

// syntax highlighter languages;
require('prismjs/components/prism-typescript.js');
require('prismjs/components/prism-scss.js');
require('prismjs/components/prism-json.js');

const filenames = require('./html--filenames.js'); // documentation generated file filenames;
const jsonContent = require('../jade-data--content'); // Short Documentation component content (JSON object);
const util = require('../util'); // Short Documentation utility functions;
const getNavObject = require('./html--nav.js');
const nav = getNavObject();
const docsDestination = 'dist/docs';

module.exports = () => {
  getReadmeData('src/components').map((component) => {
    createComponentPage(component);
  });
};



//



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
      if (currentFile.toLowerCase() === 'readme.md') {
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

function createComponentPage (component) {
  const jadeFilepath = 'src/docs/page__component.jade';
  const htmlFilename = filenames.componentPageName(component.folder);
  const htmlFilepath = docsDestination + '/' + htmlFilename;
  const markdownIt = new MarkdownIt();
  const renderedMarkdown = markdownIt.render(component.markdown);
  const jadeConfig = {
    pretty: true,
    nav: nav,
    markdown: renderedMarkdown,
    size: component.yaml.size,
    title: component.yaml.title,
    views: component.yaml.views,
    folder: component.folder
  };

  jadeConfig.views.map((view, index) => {
    let htmlToInsert = getViewHTML(component.yaml.jade, component.folder, view);

    view.nullmargins = component.yaml.nullmargins;

    createComponentIframe(htmlToInsert, component.folder, view, index);

    view.html = filenames.componentIframeName(component.folder, index);
    view.htmlContent = pretty(htmlToInsert);
    view.htmlContent = Prism.highlight(view.htmlContent, Prism.languages.html);

    if (view.json) {
      view.jsonContent = fs.readFileSync(`src/components/${ component.folder }/${ view.json }`, 'utf-8');
      view.jsonContent = Prism.highlight(view.jsonContent, Prism.languages.json);
    }

    if (component.yaml.ts) {
      view.ts = component.yaml.ts.trim().split(' ');
      view.tsContent = [];
      view.ts.map((ts, i) => {
        const fileContents = fs.readFileSync(`src/components/${ component.folder }/${ ts }`, 'utf-8');

        view.tsContent.push(Prism.highlight(fileContents, Prism.languages.typescript));
      });
    }

    if (component.yaml.scss) {
      view.scss = component.yaml.scss.trim().split(' ');
      view.scssContent = [];
      view.scss.map((scss, i) => {
        const fileContents = fs.readFileSync(`src/components/${ component.folder }/${ scss }`, 'utf-8');

        view.scssContent.push(Prism.highlight(fileContents, Prism.languages.scss));
      });
    }
  });

  const renderedHTML = jade.renderFile(jadeFilepath, jadeConfig);

  fs.writeFile(htmlFilepath, renderedHTML);

  console.log(`${ htmlFilepath.green } was created from ${ jadeFilepath.green }`);
}

function getViewHTML (jadeSource, folder, view) {
  const jadeFilepath = `src/components/${ folder }/${ jadeSource }`;
  const htmlToInsert = jade.renderFile(jadeFilepath, {
    pretty: true,
    component: jsonContent[`${ folder }/${ view.json }`], // undefined if no json is defined, no error is thrown;,
    json: jsonContent
  });

  return htmlToInsert;
}

function createComponentIframe (htmlToInsert, folder, view, index) {
  const htmlFilepath = `${ docsDestination }/iframe__${ folder }--${ index }.html`;
  const jadeFilepath = 'src/docs/iframe__component.jade';
  const renderedHTML = jade.renderFile(jadeFilepath, {
    pretty: true,
    title: view.title,
    wrapper_before: view.wrapper_before,
    wrapper_after: view.wrapper_after,
    html: htmlToInsert,
    nullmargins: view.nullmargins
  });

  fs.writeFile(htmlFilepath, renderedHTML);

  console.log(`${ htmlFilepath.green } was created from ${ jadeFilepath.green }`);
}
