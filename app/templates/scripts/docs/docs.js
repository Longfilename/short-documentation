const scssRender = require('./scss.js');
const tsRender = require('./ts.js');
const htmlRender = require('./html.js');

module.exports = {
  scss: () => {
    scssRender('src/docs/scss/docs.scss', 'dist/docs/docs.css', ['> 5% in US', 'ie >= 9']);
  },
  ts: tsRender,
  html: htmlRender
}
