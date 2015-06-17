// take a path (from gulp-rename) and change the filename;
module.exports = function (file) {
    // convert:
    // Users/jdoe/myProject/src/modules/moduleName/demo.jade
    // Users/jdoe/myProject/src/modules/moduleName/demo-red.jade
    // to:
    // Users/jdoe/myProject/docs/pages/module-moduleName.html
    // Users/jdoe/myProject/docs/pages/module-moduleName-red.html
    // so when we do a build of the documentation iframe page (with this module's content being passed in);
    // we'll be able to generate a unique HTML page for this module;
    var filename = "module-" + file.path.toString().replace(file.cwd + "/src/modules/", "");
    
    // remove the HTML portion (we're going to create our own);
    filename = filename.replace("/demo", "").replace(".jade", ".html");
    
    // convert slashes to dashes;
    filename = filename.replace(/\//g, "-");
    
    return filename;
};
