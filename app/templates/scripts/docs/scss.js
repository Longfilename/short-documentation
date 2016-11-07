const util = require('../util');

module.exports = () => {
  util.scss('src/docs/scss/docs.scss', 'dist/docs/docs.css');
};
