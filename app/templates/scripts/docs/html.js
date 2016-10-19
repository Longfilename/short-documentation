const renderTemplatePages = require('./html--templates.js');
const renderComponentPages = require('./html--components.js');
const renderDesignPages = require('./html--design.js');

module.exports = function () {
  renderTemplatePages();
  renderComponentPages();
  renderDesignPages();
};
