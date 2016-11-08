const util = require('./util');

module.exports = () => {
  util.ts('src/ts/site.ts', 'dist/js/site.js');
};
