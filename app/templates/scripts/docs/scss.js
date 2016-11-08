const util = require('../_util'); // Short Documentation shared functions;

module.exports = () => {
  util.scss('src/docs/scss/docs.scss', 'dist/docs/docs.css');
};
