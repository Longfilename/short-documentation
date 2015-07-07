var config = require("../config"),
    file   = require("file"); // traverse the file system;

// return content to pass into the Jade compiler;
// this module gets all JSON files in the modules and pages folders;
// these are used to populate module content inside Jade files;
module.exports = function () {
        // create an object to return;
    var data = {},
        // cf. http://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate
        // function to clear the require cache so we can load newer versions of the JSON data;
        requireUncached = function (module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        },
        // get a files extension, used in determining what to do with the file;
        getExtension = function (filename) {
            return filename.split(".").pop();
        },
        // folders where we're looking for .json files;
        jsonFolders = [
            config.src + "/modules/",
            config.src + "/pages/"
        ],
        // remove the above folders from the path;
        removeFolders = function (path) {
            jsonFolders.map(function (folder) {
                path = path.replace(folder, "");
            });
            
            return path;
        },
        // what to do with each folder we're looking through;
        parseFolder = function (folder, dirs, files) {
            // if we have files;
            // if this isn't the documentation folder;
            // loop through the files to see if we should include them in our JSON object;
            (files.length) && (folder.indexOf("_short-documentation") === -1) && files.forEach(function (file, index) {
                var path, newPath;
                
                // if we're actually dealing with a json file;
                if (getExtension(file) === "json") {
                    // set the key;
                    path = removeFolders(folder) + "/" + file;
                    // set the path to the file to include the contents of the JSON file as a variable;
                    newPath = "../../" + folder + "/" + file;
                    // save the value in the json object so we reference it later with Jade;
                    // create a unique key per JSON file made up of the directory it is in;
                    data[path] = requireUncached(newPath);
                }
            });
        };
    
    // go through the file system, grab all data JSON files and put them into our data object;
    jsonFolders.map(function (folder) {
        file.walkSync(folder, parseFolder);
    });
    
    // return the content for Jade to use;
    return data;
};
