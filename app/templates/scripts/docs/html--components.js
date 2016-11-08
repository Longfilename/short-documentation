const colors = require('colors'); // pretty console output;
const file = require('file'); // traverse the file system;
const fs = require('fs'); // write to the file system;
const fm = require('front-matter'); // read YAML at the beginning of Markdown files;
const jade = require('jade'); // convert Jade into HTML;
const MarkdownIt = require('markdown-it'); // convert Markdown into HTML;
const scssToJson = require('scss-to-json'); // convert SCSS vars into JSON content;
const Prism = require('prismjs'); // syntax highlighter;
const pretty = require('../_pretty'); // beautify the HTML;
const filenames = require('./html--filenames.js'); // documentation generated file filenames;
const jsonContent = require('../jade-data--content'); // Short Documentation component content (JSON object);
const util = require('../_util'); // Short Documentation shared functions;
const getNavObject = require('./html--nav.js'); // returns Short Documentation navigation object;
const nav = getNavObject(); // get Short Documentation nav object;
const docsDestination = 'dist/docs'; // destination for docs;

// syntax highlighter languages;
require('prismjs/components/prism-typescript.js');
require('prismjs/components/prism-scss.js');
require('prismjs/components/prism-json.js');

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

  // before we build the component HTML pages (doc and IFRAME pages);
  // need to get the file contents of the HTML/JSON/TS/SCSS to display in the tabs for each view;
  // per view becuase the HTML/JSON is different per view;
  jadeConfig.views.map((view, index) => {
    // build the HTML to insert into the IFRAME;
    let htmlToInsert = getViewHTML(component.yaml.jade, component.folder, view);

    // do we need to add CSS to the IFRAME page?
    // this is used for components that have a default margin that isn't appropriate when display solo in the docs;
    view.nullmargins = component.yaml.nullmargins;

    // create the IFRAME page for this view;
    createComponentIframe(htmlToInsert, component.folder, view, index);

    // add the source file to display in a component IFRAME;
    view.html = filenames.componentIframeName(component.folder, index);

    // add the HTML source to the view object to display in the view tabs;
    view.htmlContent = pretty(htmlToInsert);
    view.htmlContent = Prism.highlight(view.htmlContent, Prism.languages.html);

    // if JSON was defined (optional);
    // only one JSON file per view;
    if (view.json) {
      view.jsonContent = fs.readFileSync(`src/components/${ component.folder }/${ view.json }`, 'utf-8');
      view.jsonContent = Prism.highlight(view.jsonContent, Prism.languages.json);
    }

    // if TypeScript is defined (optional);
    if (component.yaml.ts) {
      // account for multiple TS files;
      view.ts = component.yaml.ts.trim().split(' ');
      view.tsContent = [];

      // add the TS source to the view object to display in the view tabs;
      view.ts.map((ts, i) => {
        const fileContents = fs.readFileSync(`src/components/${ component.folder }/${ ts }`, 'utf-8');

        view.tsContent.push(Prism.highlight(fileContents, Prism.languages.typescript));
      });
    }

    // if SCSS is defined (optional);
    if (component.yaml.scss) {
      // account for multiple SCSS files;
      view.scss = component.yaml.scss.trim().split(' ');
      view.scssContent = [];

      // add the SCSS source to the view object to display in the view tabs;
      view.scss.map((scss, i) => {
        const fileContents = fs.readFileSync(`src/components/${ component.folder }/${ scss }`, 'utf-8');

        view.scssContent.push(Prism.highlight(fileContents, Prism.languages.scss));
      });
    }
  });

  // build the component page HTML;
  const renderedHTML = jade.renderFile(jadeFilepath, jadeConfig);

  // create the component page;
  fs.writeFile(htmlFilepath, renderedHTML);

  // tell the world what you just did;
  console.log(`${ htmlFilepath.green } was created from ${ jadeFilepath.green }`);
}

// build the HTML to insert into the IFRAME (for a view of a component);
function getViewHTML (jadeSource, folder, view) {
  const jadeFilepath = `src/components/${ folder }/${ jadeSource }`;
  const htmlToInsert = jade.renderFile(jadeFilepath, {
    pretty: true,
    component: jsonContent[`${ folder }/${ view.json }`] || {},
    json: jsonContent
  });

  return htmlToInsert;
}

// build the IFRAME page (for a view of a component);
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

  // create the IFRAME page;
  fs.writeFile(htmlFilepath, renderedHTML);

  // tell the world what you just did;
  console.log(`${ htmlFilepath.green } was created from ${ jadeFilepath.green }`);
}
