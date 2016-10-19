module.exports = {
  componentIframeName: componentIframeName,
  componentPageName: componentPageName,
  templatePageName: templatePageName
};


function componentIframeName (folder, index) {
  return `iframe__${ folder }--${ index }.html`;
}

function componentPageName (folder) {
  return `component__${ folder }.html`;
}

function templatePageName (folder) {
  return `template__${ folder }.html`;
}
