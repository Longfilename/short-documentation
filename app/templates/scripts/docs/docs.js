const scssRender = require('./scss.js');
const tsRender = require('./ts.js');
const htmlRender = require('./html.js');

// define where all the component/template/iframe pages are built;
// global var because it is in use with the nav and the file creation;
const docsDestination = 'dist/docs';

module.exports = {
  scss: () => {
    scssRender('src/docs/scss/docs.scss', `${ docsDestination }/docs.css`, ['> 5% in US', 'ie >= 9']);
  },
  ts: tsRender,
  html: htmlRender
}
