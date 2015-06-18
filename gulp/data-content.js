// return module content to pass into the Jade compiler;
module.exports = function () {
        // traverse the file system;
    var file = require("file"),
        // create an object to return;
        json = {},
        // cf. http://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate
        // function to clear the require cache so we can load newer versions of the JSON data;
        requireUncached = function (module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        },
        // folders where we're looking for .json files;
        jsonFolders = [
            "src/modules/",
            "src/pages/"
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
            // if we have files, loop through them;
            (files.length) && files.forEach(function (file, index) {
                // create a unique key per JSON file made up of the directory it is in;
                var path, newPath;
                
                // if we're actually dealing with a json file;
                if (file.indexOf(".json") > 0) {
                    // set the key;
                    path = removeFolders(folder) + "/" + file;
                    // set the path to the file to include the contents of the JSON file as a variable;
                    newPath = "../" + folder + "/" + file;
                    // save the value in the json object so we reference it later with Jade;
                    json[path] = requireUncached(newPath);
                }
            });
        };
    
    // go through the file system, grab all data JSON files and put the values into this object;
    jsonFolders.map(function (folder) {
        file.walkSync(folder, parseFolder);
    });
    
    // return all the data we collected;
    return json;
};
