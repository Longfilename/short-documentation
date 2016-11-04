const renderTemplatePages = require('./html--templates.js');
const renderComponentPages = require('./html--components.js');
const renderDesignPages = require('./html--design.js');

// build all documentation HTML pages;
module.exports = () => {
  renderTemplatePages();
  renderComponentPages();
  renderDesignPages();
};
