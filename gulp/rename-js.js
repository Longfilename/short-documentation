// take a path (from a gulp stream) and change the filename;
module.exports = function (file) {
    // convert:
    // Users/jdoe/myProject/src/pages/myPage/page.js
    // to:
    // Users/jdoe/myProject/dist/js/page-myPage.js
    var filename = "page-" + file.path.toString().replace(file.cwd + "/src/pages/", "");
    
    // remove the "page" filename;
    filename = filename.replace("/page.js", ".js");
    
    // convert all slashes to dashes;
    filename = filename.replace(/\//g, "-");
    
    return filename;
};
