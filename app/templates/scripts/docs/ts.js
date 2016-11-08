const util = require('../_util'); // Short Documentation shared functions;

module.exports = () => {
  util.ts('src/docs/ts/docs.ts', 'dist/docs/docs.js');
};
