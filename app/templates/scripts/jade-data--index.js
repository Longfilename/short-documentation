const file = require('file'); // traverse the file system;
const fs = require('fs'); // read the contents of the README.md file;

// path to look for page content;
const folderRoot = 'src/templates/';

// generate a JSON file to pass into the Jade compiler;
// this is used on the distribution (not docs) index page to generate a list of links for pages;
const data = {
    'pages': []
};

// export the JSON data for Jade to use;
module.exports = getData();



//



// return page listing content;
function getData () {
    // go through the file system;
    // get all Jade files (soon to be HTML) and put them into the data object;
    file.walkSync(folderRoot, parseFolder);

    // once all the JSON files have been parsed;
    // return the (nicely formatted) JSON data so we can write it to a file;
    return data;
}

// what to do with each folder we’re looking through;
function parseFolder (folder, dirs, files) {
    // for each folder, this is the data we store about it;
    const item = {
        html: '',
        htmlArray: []
    };

    // loop through each file (might be multiple varients per page type);
    (files.length) && files.forEach((folderFile) => {
        // if this is a Jade file (that doesn’t start with an underscore), we want to track it because of the filename;
        if (folderFile.split('.').pop().toLowerCase() === 'jade' && folderFile.indexOf('_') !== 0 && folderFile.indexOf('index') !== 0) {
            // convert the Jade file path into an HTML file path (for the browser);
            // e.g. src/templates/article-author.jade > article-author.html;
            const htmlPath = (folderFile.replace('.jade', '.html')).replace(folderRoot, '');

            item.htmlArray.push(htmlPath);
        }
    });

    // we only want items with a HTML file;
    // for each entry in the htmlArray, we want an entry in the data object;
    (item.htmlArray.length) && item.htmlArray.forEach((folderFile) => {
        const itemClone = JSON.parse(JSON.stringify(item));

        // kill the clone’s array, it’s not needed in Jade;
        delete itemClone.htmlArray;

        // don’t create a entry for an include (defined by a leading _);
        // there’s no page to view for it;
        if (folderFile.indexOf('_') !== 0) {
            itemClone.html = folderFile;

            // save the page for Jade;
            data.pages.push(itemClone);
        }
    });
}
