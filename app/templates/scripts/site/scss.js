const util = require('../_util'); // Short Documentation shared functions;

module.exports = (callback) => {
  util.scss('src/scss/site.scss', 'dist/css/site.css', callback);
};
