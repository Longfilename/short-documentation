"use strict";

var src  = "src",  // files to dev on;
    dist = "dist", // where production ready files are written to;
    docs = "docs"; // where documentation files are written to;

/*

module jade:
build: n/a
docs-in:      /modules/folder1/folder2/module.jade
docs-in:      /modules/folder1/folder2/module-filename.jade
docs-exclude: !_*.jade, !demo.jade, !demo-*.jade
docs-out:     /html/module-folder1-folder2.html
docs-out:     /html/module-folder1-folder2-filename.html

page jade:
in:      /pages/folder1/folder2/page.jade
in:      /pages/folder1/folder2/page-filename.jade
exclude: !_*.jade, _docs/*
out:     /html/page-folder1-folder2.html
out:     /html/page-folder1-folder2-filename.html

*/


module.exports = {
    // delete documentation and the build;
    "clean": {
        "src": [dist, docs]
    },
    // generate HTML;
    "jade": {
        // file renaming logic;
        "rename": function (pathObject) {
            // create a new filename based off the folder structure;
            // folderName/page.jade --> page-folderName.html;
            var newBasename = "page-" + pathObject.dirname;
            
            // if this filename starts with page-, that means we need to save that filename text;
            // folderName/page-red.jade --> page-folderName-red.html;
            if (pathObject.basename.indexOf("page-") === 0) {
                newBasename = newBasename + "-" + pathObject.basename.replace("page-", "");
            }
            
            // return the new object values to use in gulp-rename;
            return {
                "basename": newBasename,
                "dirname": "",
                "extname": ".html"
            };
        },
        "dist": {
            // these files will be compiled;
            // don't include partials (those are being included somewhere else);
            // and don't include the documentation pages;
            "compile": [src + "/pages/**/*.jade", "!" + src + "/pages/_docs/*", "!" + src + "/pages/**/_*.jade"],
            // to this location (files will have a new filename);
            "dest": dist + "/html"
        },
        
        
        
        
        
        
        
        
        
        "documentation": {
            // include one entry per module, and pages;
            "paths": [src + "/{modules,pages}/**/readme.md"],
            "template": src + "/pages/_docs/default.jade",
            "dest": docs
        },
        // pages for the documentation and the build;
        "pages": {
            // whenever any of these files change;
            "watch":   [src + "/**/*.jade"],
            // these files will be compiled;
            // don't include partials (those are being included somewhere else);
            // and don't include the documentation pages;
            "compile": [src + "/pages/**/*.jade", "!" + src + "/pages/_docs/*", "!" + src + "/pages/**/_*.jade"],
            // to this location (with the same path/filename);
            "dest": {
                "build": dist + "/html",
                "docs":  docs + "/html"
            },
            // the filename is treated differently if we're dealing with the page in the documentation folder;
            "documentation": "_docs"
        },
        // modules for the documentation (the build doesn't need individual modules);
        "modules": {
            // need to know the folder to parse out;
            // yeah, it's not likely to change, but if it does, we don't have to do it in two places;
            "src": src,
            // for each demo.jade, we'll create a page for the module;
            // this is the wrapper jade for the actual module;
            "module": [src + "/modules/**/demo.jade"],
            // this is the iframe page we're putting the module into;
            "iframe": [src + "/pages/_docs/_iframe.jade"],
            // and this is where the iframe HTML is deposited;
            "dest": docs + "/html"
        }
    },
    // generate CSS for the documentation and the build;
    "scss": {
        "compile": [src + "/scss/*.scss", "!" + src + "/scss/_*.scss"],
        "dest": {
            "build": dist + "/css",
            "docs":  docs + "/css"
        },
        "maps": "./",
        // config for a plugin that fixes CSS with browser prefixes;
        "autoprefixer": {
            "browsers": [
                "last 2 versions",
                "safari 5",
                "ie 8",
                "ie 9",
                "opera 12.1",
                "ios 6",
                "android 4"
            ],
            "cascade": true
        }
    },
    // concatenate JS files for the documentation and the build;
    "js": {
        // enable source maps;
        "debug": true,
        // enable file names and size reporting in the console;
        "showFiles": {
            "showFiles": true
        },
        // a separate bundle will be generated for each item;
        "input": [
            "./" + src + "/pages/_docs/page.js",
            "./" + src + "/pages/home/page.js",
            "./" + src + "/pages/landing/page.js",
            "./" + src + "/pages/article/page.js"
        ],
        // the bundle is written to the following two locations;
        "output": {
            // order of files must be the same;
            "build": [
                "./" + dist + "/js/page-home.js", // make sure the documentation JS is overwritten in build;
                "./" + dist + "/js/page-home.js",
                "./" + dist + "/js/page-landing.js",
                "./" + dist + "/js/page-article.js"
            ],
            "docs": [
                "./" + docs + "/js/page-documentation.js",
                "./" + docs + "/js/page-home.js",
                "./" + docs + "/js/page-landing.js",
                "./" + docs + "/js/page-article.js"
            ]
        },
        // name the bundle that will contain common JS (shared across multiple bundles);
        "common": "common.js",
        // where this common file lives (for the build process);
        "src": "./" + src + "/js",
        // where this common file is written to;
        // it's written to two places, but it's only read from one;
        "dest": {
            "build": dist + "/js",
            "docs": docs + "/js"
        }
    }
};
