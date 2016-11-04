const file = require('file'); // traverse the file system;
const fs = require('fs'); // write to the file system;
const fm = require('front-matter'); // read YAML at the beginning of Markdown files;
const MarkdownIt = require('markdown-it'); // convert Markdown into HTML;
const filenames = require('./html--filenames.js'); // Short Documentation utility functions;
const getDesignPages = require('./html--nav-design.js'); // Short Documentation design navigation;

module.exports = () => {
  // navigation object to be used in Jade file creation;
  const nav = {
    design: getDesignPages,
    templates: [],
    components: []
  };

  // get all components and templates for the documentation (JSON objects);
  const components = getReadmeData('src/components');
  const templates = getReadmeData('src/templates');

  // convert the template objects into a navigation structure (title, link);
  templates.map((template) => {
    nav.templates.push({
      text: template.nav,
      url: filenames.templatePageName(template.folder),
      icons: template.icons
    });
  });

  // convert the component objects into a navigation structure (title, link);
  components.map((component) => {
    nav.components.push({
      text: component.nav,
      url: filenames.componentPageName(component.folder),
      icons: component.icons
    });
  });

  return nav;
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

        // return a folder object (fit for both components and templates);
        folderData.push({
          folder: currentFolder.split('/').pop(),
          nav: fmContents.attributes.nav,
          icons: fmContents.attributes.icons
        });
      }
    });
  }
}
