module.exports = {
  componentIframeName: (folder, index) => {
    return `iframe__${ folder }--${ index }.html`;
  },
  componentPageName: (folder) => {
    return `component__${ folder }.html`;
  },
  templatePageName: (folder) => {
    return `template__${ folder }.html`;
  }
};
