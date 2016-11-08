const file = require('file');  // traverse the file system;

// paths to parse to look for JSON files;
const jsonFolders = [
  'src/components/',
  'src/templates/'
];

// this module gets all JSON files in the modules and pages folders;
// these are used to populate module content inside Jade files;
// create an object to return;
const data = {};

// export the JSON data for Jade to use;
module.exports = getData();



//



// return component and page JSON content;
function getData () {
  // go through the file system, grab all data JSON files and put them into our data object;
  jsonFolders.map((folder) => {
    file.walkSync(folder, parseFolder);
  });

  // once all the JSON files have been parsed;
  // return the JSON data so we can use it in Jade processing;
  return data;
}

// what to do with each folder we’re looking through;
function parseFolder (folder, dirs, files) {
  // if we have files;
  // loop through the files to see if we should include them in our JSON object;
  (files.length) && files.forEach((folderFile) => {
    // if we’re actually dealing with a JSON file;
    if (folderFile.split('.').pop().toLowerCase() === 'json') {
      // define the property key (the path to the JSON file);
      const key = removeFolders(folder) + '/' + folderFile;

      // define the property value (the contents of the JSON file);
      // relative to this file;
      // this path isn’t being saved, the contents of the file are;
      const path = '../' + folder + '/' + folderFile;

      // save the new property in the JSON object so we reference it with Jade;
      data[key] = requireUncached(path);
    }
  });
}

// remove known folders from the path;
function removeFolders (path) {
  // path will be transformed, save the original value;
  let newPath = path;

  // loop through the starting locations and remove those parts from the recorded path;
  // this way in Jade you don’t repeat yourself;
  // reference the JSON content as 'my/component/content.json' instead of 'src/components/my/component/component.json';
  jsonFolders.map((folder) => {
    newPath = newPath.replace(folder, '');
  });

  // return the truncated path to act as the property key;
  return newPath;
}

// cf. http://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate
// function to clear the require cache so we can load newer versions of the JSON data;
function requireUncached (module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}
