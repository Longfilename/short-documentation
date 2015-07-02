"use strict";
var fs     = require("fs"),               // traverse the file system to load a JSON config;
    util   = require("util"),
    path   = require("path"),
    yeoman = require("yeoman-generator"),
    yosay  = require("yosay"),
    chalk  = require("chalk"),
    os     = require("os"),
    
    // the global project configuration object;
    configJSON,
    
    // global documentation context (because it's populated away from where it is used);
    documentationContext = {
        "pages": "",
        "modules": ""
    },
    
    // check if the user wanted documentation generated;
    ifDocumentation = function () {
        return configJSON.project.documentation;
    },
    
    // strings that will be inserted into the global Sass file;
    sassIncludes = "",
    
    shortDocumentationGenerator = yeoman.generators.Base.extend({
        readJSON: function () {
            var done = this.async();
            
            fs.readFile("config-yeoman.json", "utf8", function (err, data) {
                // if there was an error reading the JSON file;
                if (err) {
                    // let us know what it was;
                    console.log("Error: " + err);
                    return;
                }
                
                // turn the JSON response into a JS object;
                configJSON = JSON.parse(data);
                
                // record the project title;
                documentationContext.projectName = configJSON.project.name;
                
                console.log(configJSON);
                
                // let Yeoman know that this async function is done so we can move onto the next function;
                done();
            });
        },
        copyModuleFiles: function () {
            var module,   // a module from the modules object (read from the JSON file);
                content,  // content to pass to each file (content pulled from the JSON file);
                path,     // path of the module we're going to create;
                jsObject, // JS property value for this module (can be true, or an array);
                jsKey;    // jsObject[jsKey] is the filename for the JS file we're going to create; 
            
            // loop through each module in the JSON and build a folder for it;
            for (module in configJSON.modules) {
                // yeoman context - used to insert dynamic content into the files;
                content = {
                    "moduleName": module
                };
                
                // path to the new module;
                path = "src/modules/" + content.moduleName;
                
                // record the sass file for later inclusion in the global Sass file;
                sassIncludes = sassIncludes + '@import "../modules/' + content.moduleName + '/module";' + os.EOL;
                
                // create these files for each module in our new site;
                // assume every module needs a Jade and Sass file;
                this.template("src/modules/module/_content.json", path + "/_content.json", content);
                this.template("src/modules/module/demo.jade",     path + "/demo.jade", content);
                this.template("src/modules/module/module.jade",   path + "/module.jade", content);
                this.template("src/modules/module/module.scss",   path + "/module.scss", content);
                this.template("src/modules/module/readme.md",     path + "/readme.md", content);
                
                jsObject = configJSON.modules[module].js || null;
                
                // if we have JS to generate;
                if (jsObject) {
                    // if true, just create the base JS file;
                    if (typeof jsObject === "boolean") {
                        this.template("src/modules/module/module.js", path + "/module.js");
                    // if an array, create the named files;
                    } else {
                        // create a file for each entry in the module JS array;
                        for (jsKey in jsObject) {
                            this.template("src/modules/module/module.js", path + "/" + jsObject[jsKey] + ".js");
                        }
                    }
                }
            }
        },
        /*
        copyPageFiles: function () {
            var pageKey,
                context,
                i,
                j = 0,
                isLastKey = function (index) {
                    return (Object.keys(configJSON.pages).length === index);
                };
            
            // loop through each page in the JSON and build a folder for it;
            for (pageKey in configJSON.pages) {
                // create our own counter so we can detect when we're on the last key;
                j = j + 1;
                
                // yeoman context - used to insert dynamic content into the files;
                context = {
                    "moduleName": pageKey,
                    "moduleJade": ""
                };
                
                // create the Jade include statements (for related modules) to insert into the page;
                for (i = 0; i < configJSON.pages[pageKey].length; i = i + 1) {
                    context.moduleJade = context.moduleJade + "        include ../../modules/" + configJSON.pages[pageKey][i] + "/module" + os.EOL;
                }
                
                // create the include statement for the documentation;
                documentationContext.pages = documentationContext.pages + "         \"../src/pages/" + pageKey + "/config.json\"" + ((isLastKey(j) == false) ? "," + os.EOL : "");
                
                // create these files for each page in our new site;
                if (ifDocumentation()) {
                    this.template("src/pages/_page/config.json", "src/pages/" + context.moduleName + "/config.json", context);
                    this.template("src/pages/_page/readme.md",   "src/pages/" + context.moduleName + "/readme.md",   context);
                }
                this.template("src/pages/_page/page.jade",   "src/pages/" + context.moduleName + "/" + context.moduleName + ".jade",   context);
            }
        },
        copyScssFiles: function () {
            var context = {
                "modules": sassIncludes
            };
            
            // create these files for our new site;
            this.copy("src/css/_base.scss",      "src/css/_base.scss");
            this.copy("src/css/_fonts.scss",     "src/css/_fonts.scss");
            this.copy("src/css/_layout.scss",    "src/css/_layout.scss");
            this.copy("src/css/_mixins.scss",    "src/css/_mixins.scss");
            this.copy("src/css/_reset.scss",     "src/css/_reset.scss");
            this.copy("src/css/_variables.scss", "src/css/_variables.scss");
            this.template("src/css/site.scss",   "src/css/site.scss", context);
        },
        copyJavaScriptFiles: function () {
            var context = {
                "modules": jsIncludes
            };
            
            this.template("src/js/global.js", "src/js/global.js", context);
            this.copy("src/js/libs.js",       "src/js/libs.js");
            this.copy("src/js/libs.js",       "src/js/modernizr.js");
        },
        copyImgFiles: function () {
            // create these files for our new site;
            this.copy("src/img/device-icons/64x64-favicon.ico",        "src/img/device-icons/64x64-favicon.ico");
            this.copy("src/img/device-icons/180x180-ios-icon.png",     "src/img/device-icons/180x180-ios-icon.png");
            this.copy("src/img/device-icons/192x192-android-icon.png", "src/img/device-icons/192x192-android-icon.png");
            this.copy("src/img/device-icons/config-windows-tiles.xml", "src/img/device-icons/config-windows-tiles.xml");
            this.copy("src/img/device-icons/128x128-windows-tile.png", "src/img/device-icons/128x128-windows-tile.png");
            this.copy("src/img/device-icons/270x270-windows-tile.png", "src/img/device-icons/270x270-windows-tile.png");
            this.copy("src/img/device-icons/558x270-windows-tile.png", "src/img/device-icons/558x270-windows-tile.png");
            this.copy("src/img/device-icons/558x558-windows-tile.png", "src/img/device-icons/558x558-windows-tile.png");
        },
        copyIncludeFiles: function () {
            // create these files for our new site;
            this.copy("src/includes/_head.jade",    "src/includes/_head.jade");
            this.copy("src/includes/_html.jade",    "src/includes/_html.jade");
            this.copy("src/includes/_scripts.jade", "src/includes/_scripts.jade");
        },
        copyConfigFiles: function () {
            // yeoman context - used to insert dynamic content into the files;
            var context = {
                "projectName": configJSON.project.name
            };
            
            // editor and gulp plugin configurations, nothing to serve to the client browser;
            this.copy(".eslintrc",      ".eslintrc");
            this.copy(".gitignore",     ".gitignore");
            this.copy(".scss-lint.yml", ".scss-lint.yml");
            this.copy("gulpfile.js",    "gulpfile.js");
            this.copy("package.json",   "package.json");
            this.template("readme.md",  "readme.md", context);
        },
        copyDocumentationApp: function () {
            if(ifDocumentation()) {
                // way too many files being copied over - but lets it get working, then i can optimize;
                this.copy("docs/css/jquery.snippet.min.css", "docs/css/jquery.snippet.min.css");
                this.copy("docs/css/reset.css",              "docs/css/reset.css");
                this.copy("docs/css/style.css",              "docs/css/style.css");
                this.copy("docs/js/jquery.min.js",           "docs/js/jquery.min.js");
                this.copy("docs/js/jquery.snippet.min.js",   "docs/js/jquery.snippet.min.js");
                this.copy("docs/js/jquery.sortElements.js",  "docs/js/jquery.sortElements.js");
                this.copy("docs/js/markdown.converter.js",   "docs/js/markdown.converter.js");
                this.copy("docs/js/markdown.sanitizer.js",   "docs/js/markdown.sanitizer.js");
                this.copy("docs/js/script.js",               "docs/js/script.js");
                this.template("docs/config.json",            "docs/config.json", documentationContext);
                this.template("docs/default.html",           "docs/default.html", documentationContext);
                this.copy("docs/frame.html",                 "docs/frame.html");
            }
        },
        */
        hello: function () {
            // welcome the user to our generator;
            console.log(yosay("Woohoo no errors!"));
        }
    });

// then run it;
module.exports = shortDocumentationGenerator;
