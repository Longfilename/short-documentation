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
        createInputPath = function (folder, filename) {
            return folder + "/" + filename;
        },
        createOutputPath = function (base, folder) {
            var fixFilename = function (prefix, folders) {
                    var string = prefix + folders + ".js";
                    
                    string = base + string.replace(/\//g, "-");
                    
                    return string;
                },
                prefix = (folder.indexOf("_short-documentation") === 0) ? "" : "page-";
            
            return fixFilename(prefix, folder.replace("src/pages/", ""));
        },
        // what to do with each folder we're looking through;
        parseFolder = function (folder, dirs, files) {
            // if we have files, loop through them;
            (files.length) && files.forEach(function (file, index) {
                // if we're actually dealing with a JS file (that doesn't start with an underscore);
                if (file.indexOf(".js") > 0 && file.indexOf("_") !== 0) {
                    if (folder.indexOf("_short-documentation") === -1) {
                        fileArray.input.dist.push(createInputPath(folder, file));
                        fileArray.output.dist.push(createOutputPath(config.paths.output.dist, folder));
                        
                        fileArray.input.docs.push(createInputPath(folder, file));
                        fileArray.output.docs.push(createOutputPath(config.paths.output.docs, folder));
                    } else {
                        fileArray.input.docs.push(createInputPath(folder, file));
                        fileArray.output.docs.push(createOutputPath(config.paths.output.docs, "_short-documentation"));
                    }
                }
            });
        };
    
    // go through the file system, grab all data JSON files and put the values into this object;
    file.walkSync(config.paths.input, parseFolder);
    
    // return all the data we collected;
    return fileArray;
};
