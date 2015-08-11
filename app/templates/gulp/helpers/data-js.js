var config = require("../config").js,
    slash  = require("slash"), // needed to fix file paths on Windows;
    file   = require("file");  // traverse the file system;

// return module content to pass into browserify;
// we need to generate a list of all the JS files to process, and where they should be published;
module.exports = function () {
        // all the config we need for browserify;
    var data = {
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
        // generate a path to the file we want to run through browserify; 
        createInputPath = function (folder, filename) {
            return folder + "/" + filename;
        },
        // generate a path where we want the file to be published after browserify crunches it;
        createOutputPath = function (base, folder) {
            var fixFilename = function (prefix, folders) {
                    var string = prefix + folders + ".js";
                    
                    // remove forward and back slashes for OS X & Windows;
                    string = base + string.replace(/\//g, "-").replace(/\\/g, "-");
                    
                    return string;
                },
                // if this isn't a documentation file, add page- as a filename prefix;
                prefix = (folder.indexOf("_short-documentation") === 0) ? "" : "page-",
                // remove folder paths in OS X & Windows;
                newFolder = folder.replace("src/pages/", "").replace("src\\pages\\", "");
            
            // use Slash to normalize the path across environments;
            return slash(fixFilename(prefix, newFolder));
        },
        // what to do with each folder we're looking through;
        parseFolder = function (folder, dirs, files) {
            // if we have files, loop through them;
            (files.length) && files.forEach(function (file, index) {
                // if we're actually dealing with a JS file (that doesn't start with an underscore);
                if (file.indexOf(".js") > 0 && file.indexOf("_") !== 0) {
                    // if this is NOT the documentation files;
                    if (folder.indexOf("_short-documentation") === -1) {
                        // save for dist;
                        data.input.dist.push(createInputPath(folder, file));
                        data.output.dist.push(createOutputPath(config.paths.output.dist, folder));
                        
                        // and save for docs;
                        data.input.docs.push(createInputPath(folder, file));
                        data.output.docs.push(createOutputPath(config.paths.output.docs, folder));
                    } else {
                        // otherwise just save for docs;
                        data.input.docs.push(createInputPath(folder, file));
                        data.output.docs.push(createOutputPath(config.paths.output.docs, "_short-documentation"));
                    }
                }
            });
        };
    
    // go through the file system, grab all data JSON files and put the values into this object;
    file.walkSync(config.paths.input, parseFolder);
    
    // return the structure for browserify to parse JS files;
    return data;
};
