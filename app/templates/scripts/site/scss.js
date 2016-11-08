const util = require('../_util'); // Short Documentation shared functions;

module.exports = () => {
  util.scss('src/scss/site.scss', 'dist/css/site.css');
};
