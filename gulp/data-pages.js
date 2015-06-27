var config = require("./config").js,
    // traverse the file system;
    file = require("file"),
    // read the contents of the readme.md file;
    fs = require("fs");

// return module content to pass into the Jade compiler;
module.exports = function () {
        // all the config we need for browserify;
    var fileArray = {
            // the input files;
            "input": {
                "dist": [],
                "docs": []
            },
            // and where we want them built;
            "output": {
                "dist": [],
                "docs": []
            }
        },
        // what to do with each folder we're looking through;
        parseFolder = function (folder, dirs, files) {
            // if we have files, loop through them;
            (files.length) && files.forEach(function (file, index) {
                var path, filename;
                
                // if we're actually dealing with a JS file (that doesn't start with an underscore);
                if (file.indexOf(".js") > 0 && file.indexOf("_") !== 0) {
                    filename = file;
                    // now remove the part of the path we don't care about (src/page by default);
                    path = folder.replace(config.paths.input, "") + "/";
                    // create the proper path to the file;
                    path = config.paths.input + path + filename;
                    // save this file for browerify to use as an input;
                    fileArray.input.docs.push(path);
                    
                    // don't save the documentation JS in the dist;
                    if (path.indexOf("docs") === -1) {
                        fileArray.input.dist.push(path);
                    }
                    
                    // generate the filename we'll publish as (for both dist and docs);
                    // /folder1/folder2/page.js ==> page-folder1-folder2.js;
                    path = folder.replace(config.paths.input, "");
                    filename = "page-" + path.replace("_", "-").replace(/\//g, "-") + ".js";
                    
                    if (path.indexOf("docs") === -1) {
                        path = config.paths.output.dist + filename;
                        fileArray.output.dist.push(path);
                    }
                    
                    path = config.paths.output.docs + filename;
                    fileArray.output.docs.push(path);
                }
            });
        };
    
    // go through the file system, grab all data JSON files and put the values into this object;
    file.walkSync(config.paths.input, parseFolder);
    
    // return all the data we collected;
    return fileArray;
};
