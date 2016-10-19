const cssRender = require('./docs/scss.js');
const jsRender = require('./docs/js.js');
const htmlRender = require('./docs/html.js');

// define where all the component/template/iframe pages are built;
// global var because it is in use with the nav and the file creation;
const docsDestination = 'dist/docs';

module.exports = {
  scss: () => {
    cssRender('src/docs/scss/docs.scss', docsDestination  + '/docs.css', ['> 5% in US', 'ie >= 9']);
  },
  js: () => {
    jsRender('src/docs/js/docs.js', docsDestination  + '/docs.js');
  },
  html: htmlRender
}
