// return module content to pass into the Jade compiler;
module.exports = function () {
    var file = require("file"),
        // create an object to return;
        json = {},
        // cf. http://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate
        // function to clear the require cache so we can load newer versions of the JSON data;
        requireUncached = function (module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        },
        jsonFolders = [
            "src/modules/",
            "src/pages/"
        ],
        removeFolders = function (text) {
            jsonFolders.map(function (folder) {
                text = text.replace(folder, "");
            });
            
            return text;
        },
        parseFolder = function (dirPath, dirs, files) {
            if (files.length) {
                files.forEach(function (currentValue, index) {
                    // create a unique key per JSON file made up of the directory it is in;
                    var path, newPath;
                    
                    // if we're actually dealing with a json file;
                    if (currentValue.indexOf(".json") > 0) {
                        // set the key;
                        path = removeFolders(dirPath) + "/" + currentValue;
                        // set the path to the file to include the contents of the JSON file as a variable;
                        newPath = "../" + dirPath + "/" + currentValue;
                        // save the value in the json object so we reference it later with Jade;
                        json[path] = requireUncached(newPath);
                    }
                });
            }
        };
    
    // go through the file system, grab all data JSON files and put the values into this object;
    jsonFolders.map(function (folder) {
        file.walkSync(folder, parseFolder);
    });
    
    return json;
};
