'use strict';

const fs = require('fs'); // traverse the file system to load a JSON config;
const yeoman = require('yeoman-generator'); // yeoman toolset;
const yosay = require('yosay'); // ASCII art for yeoman console message;
const os  = require('os'); // used for OS specific end-of-line characters;

let config; // the global project configuration object (populated by the JSON config file);
let scssIncludes = ''; // string that will be inserted into the global SCSS file (paths to all SCSS files);
let jsIncludes = ''; // string that will be inserted into the global TS file (paths to all TS files);

module.exports = yeoman.Base.extend({
  readJSON: function () {
    const done = this.async();

    fs.readFile('config-yeoman.json', 'utf8', function (err, data) {
      // if there was an error reading the JSON file;
      if (err) {
        // error message for a missing file;
        if (err.code === 'ENOENT') {
          console.log(yosay('ERROR! ERROR! ERROR! config-yeoman.json file does not exist.'));
        // error message for any other error;
        } else {
          console.log(err);
        }

        // and stop the generator from going any further;
        return;
      }

      // turn the JSON response into a JS object;
      config = JSON.parse(data);

      // let Yeoman know that this async function is done so we can move onto the next function;
      done();
    });
  },
  copyComponentFiles: function () {
    // loop through each module in the JSON and build a folder for it;
    for (let component in config.components) {

      // yeoman context - used to insert dynamic content into the files;
      const content = {
        name: component,
        js: config.components[component].js || false,
        size: config.components[component].size || false
      };

      // path to the new component;
      const path = `src/components/${ content.name }`;

      // record the scss file for later inclusion in the global SCSS file;
      scssIncludes = `${ scssIncludes }@import '../components/${ content.name }/${ content.name }';${ os.EOL }`;

      // create these files for each component in our new site;
      // assume every component needs a Jade and SCSS file;
      this.template('src/components/component/_component.json', `${ path }/_${ content.name }.json`, content);
      this.template('src/components/component/component.jade', `${ path }/${ content.name }.jade`, content);
      this.template('src/components/component/component.scss', `${ path }/${ content.name }.scss`, content);
      this.template('src/components/component/README.md', `${ path }/README.md`, content);

      // if we have JS to generate;
      if (content.js !== false) {
        this.template(`src/components/component/component.ts`, `${ path }/${ content.name }.ts`, content);
        jsIncludes = `${ jsIncludes }import '../components/${ content.name }/${ content.name }';${ os.EOL }`;
      }
    }
  },
  copyTemplateFiles: function () {
    // loop through each template in the JSON and build a folder for it;
    for (let template in config.templates) {
      // yeoman context - used to insert dynamic content into the files;
      const content = {
        name: `${ template }`,
        moduleJade: ''
      };

      // for each module in this page;
      config.templates[template].map((component) => {
        // create the Jade include statements;
        // make sure to indent twice (2 space indent) for proper nesting;
        content.moduleJade = `${ content.moduleJade }    include ../../components/${ component }/${ component }${ os.EOL }`;
      });

      // create the files for this page;
      this.template('src/templates/template/template.jade', `src/templates/${ content.name }/${ content.name }.jade`, content);
      this.template('src/templates/template/README.md', `src/templates/${ content.name }/README.md`, content);
    }
  },
  copyScssFiles: function () {
    this.copy('src/scss/_bem-base.scss', 'src/scss/_bem-base.scss');
    this.copy('src/scss/_global.scss', 'src/scss/_global.scss');
    this.copy('src/scss/_mixins__reset--base.scss', 'src/scss/_mixins__reset--base.scss');
    this.copy('src/scss/_mixins__reset--forms.scss', 'src/scss/_mixins__reset--forms.scss');
    this.copy('src/scss/_mixins.scss', 'src/scss/_mixins.scss');
    this.copy('src/scss/_variables--bootstrap.scss', 'src/scss/_variables--bootstrap.scss');
    this.copy('src/scss/_variables--colors.scss', 'src/scss/_variables--colors.scss');
    this.copy('src/scss/_variables--fonts.scss', 'src/scss/_variables--fonts.scss');
    this.copy('src/scss/_variables--grid.scss', 'src/scss/_variables--grid.scss');
    this.copy('src/scss/_variables.scss', 'src/scss/_variables.scss');
    this.template('src/scss/site.scss', 'src/scss/site.scss', { components: scssIncludes });
  },
  copyTypeScriptFiles: function () {
    this.template('src/ts/site.ts', 'src/ts/site.ts', { components: jsIncludes });
  },
  copyImgFiles: function () {
    this.directory('src/images', 'src/images');
  },
  copyIncludeFiles: function () {
    this.copy('src/templates/_foot.jade', 'src/templates/_foot.jade');
    this.copy('src/templates/_head.jade', 'src/templates/_head.jade');
    this.copy('src/templates/index.jade', 'src/templates/index.jade');
  },
  copyConfigFiles: function () {
    // editor and gulp plugin configurations, nothing to serve to the client browser;
    this.copy('_editorconfig', '.editorconfig');
    this.copy('_gitignore', '.gitignore');
    this.copy('_stylelintrc', '.stylelintrc');
    this.copy('package.json', 'package.json');
    this.copy('tsconfig.json', 'tsconfig.json');
    this.copy('tslint.json', 'tslint.json');
    this.copy('typings.json', 'typings.json');

    this.template('README.md', 'README.md', { projectName: config.project.name });
  },
  copyDocumentationApp: function () {
    this.directory('src/docs', 'src/docs');
  },
  copyBuildScripts: function () {
    this.directory('scripts', 'scripts');
  },
  hello: function () {
    // welcome the user to our generator;
    console.log(yosay(`Short Documentation built the ${ config.project.name } project without errors.`));
  }
});
