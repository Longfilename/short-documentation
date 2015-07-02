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
                        this.template("src/modules/module/module.js", path + "/module.js", content);
                    // if an array, create the named files;
                    } else {
                        // create a file for each entry in the module JS array;
                        for (jsKey in jsObject) {
                            this.template("src/modules/module/module.js", path + "/" + jsObject[jsKey] + ".js", content);
                        }
                    }
                }
            }
        },
        copyPageFiles: function () {
            var page,     // a page from the page object (read from the JSON file);
                content,  // content to pass to each file (content pulled from the JSON file);
                jsObject; // JS property value for a module (can be true, or an array);
            
            // loop through each page in the JSON and build a folder for it;
            for (page in configJSON.pages) {
                // yeoman context - used to insert dynamic content into the files;
                content = {
                    "moduleName": page,
                    "moduleJade": "",
                    "moduleJS": ""
                };
                
                // for each module in this page;
                configJSON.pages[page].map(function (module) {
                    // create the Jade include statements;
                    content.moduleJade = content.moduleJade + "        include ../../modules/" + module + "/module" + os.EOL;
                    
                    // and create the JS import statements;
                    // find the JS property of this module's object;
                    jsObject = configJSON.modules[module].js || null;
                    
                    // if this module has JS to generate;
                    if (jsObject) {
                        // if true, just include the base JS file;
                        if (typeof jsObject === "boolean") {
                            content.moduleJS = content.moduleJS + "import ../../modules/" + module + "/module" + os.EOL;
                        // if an array, include the named files;
                        } else {
                            // include a file for each entry in the module JS array;
                            jsObject.map(function (js) {
                                content.moduleJS = content.moduleJS + 'import "../../modules/' + module + '/' + js + '.js";' + os.EOL;
                            });
                        }
                    }
                });
                
                // now that the content for this page has been generated;
                // create the files for this page;
                this.template("src/pages/page/page.jade", "src/pages/" + content.moduleName + "/page.jade", content);
                this.template("src/pages/page/page.js",   "src/pages/" + content.moduleName + "/page.js", content);
                this.template("src/pages/page/readme.md", "src/pages/" + content.moduleName + "/readme.md", content);
            }
        },
        copyScssFiles: function () {
            var content = {
                "modules": sassIncludes
            };
            
            // create these files for our new site;
            this.copy("src/scss/_base.scss",      "src/scss/_base.scss");
            this.copy("src/scss/_fonts.scss",     "src/scss/_fonts.scss");
            this.copy("src/scss/_layout.scss",    "src/scss/_layout.scss");
            this.copy("src/scss/_mixins.scss",    "src/scss/_mixins.scss");
            this.copy("src/scss/_variables.scss", "src/scss/_variables.scss");
            this.template("src/scss/site.scss",   "src/scss/site.scss", content);
        },
        copyJavaScriptFiles: function () {
            // for now we don't have any global JS files to copy over;
            // so create a folder in preperation for future files;
            this.mkdir("src/js");
        },
        copyImgFiles: function () {
         // for now we don't have any image files to copy over;
         // so create a folder in preperation for future files;
         this.mkdir("src/img");
        },
        copyIncludeFiles: function () {
            // create these files for our new site;
            this.copy("src/includes/head.jade",    "src/includes/head.jade");
            this.copy("src/includes/scripts.jade", "src/includes/scripts.jade");
        },
        /*
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
