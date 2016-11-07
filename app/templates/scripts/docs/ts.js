const util = require('../util');

module.exports = () => {
  util.ts('src/docs/ts/docs.ts', 'dist/docs/docs.js');
};
