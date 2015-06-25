// take a path (from a gulp stream) and change the filename;
module.exports = function (file) {
    var filename;
    // convert:
    // Users/jdoe/myProject/src/js/filename.js
    // to:
    // Users/jdoe/myProject/dist/js/filename.js
    filename = file.path.toString().replace(file.cwd + "/src/js/", "");
    
    // convert all slashes to dashes;
    filename = filename.replace(/\//g, "-");
    
    return filename;
};
