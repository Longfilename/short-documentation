const htmlTemplates = require('./html--templates');
const htmlIndex = require('./html--index');

module.exports = () => {
  htmlTemplates();
  htmlIndex();
};
