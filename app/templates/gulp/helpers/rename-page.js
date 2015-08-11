var root = require("../config").jade.pages.root;

// take a path (from gulp-rename) and change the filename;
module.exports = function (path) {
    // create a new filename based off the folder structure;
    // folderName/page.jade --> page-folderName.html;
    var newBasename = "page-" + path.dirname;
    
    // if this filename starts with page-, that means we need to save that filename text;
    // index ==> index;
    if (path.basename.indexOf(root) === 0) {
        newBasename = path.basename;
    // foo/page-bar.jade ==> page-foo-bar.html;
    // foo/bar/page-baz.jade ==> page-foo-bar-baz.html;
    } else if (path.basename.indexOf("page-") === 0) {
        newBasename = newBasename + "-" + path.basename.replace("page-", "");
    }
    
    // convert slashes to dashes;
    newBasename = newBasename.replace(/\\/g, "/").replace(/\//g, "-");
    
    // return the new object values to use in gulp-rename;
    return {
        "basename": newBasename,
        "dirname": "",
        "extname": ".html"
    };
};
