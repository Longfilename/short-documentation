const util = require('./util');

module.exports = () => {
  util.scss('src/scss/site.scss', 'dist/css/site.css');
};
