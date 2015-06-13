var gulp         = require("gulp"),
    config       = require("../../config.js").jade.documentation,
    jade         = require("gulp-jade"),           // translate jade into HTML;
    fs           = require("fs"),
    tap          = require("gulp-tap"),            // allows us access to the generated HTML;
    plumber      = require("gulp-plumber"),        // error trapping so an error doesn't kill Gulp;
    handleErrors = require("../../handle-errors"), // function to fire on error;
    content,
    getExtension = function (filename) {
        return filename.split(".").pop();
    };

// jade-docs:         build documentation/default.html
// jade-docs-html:    but, before we build default.html;
// jade-docs-content: we need to build the object to pass into that Jade function;
gulp.task("jade-docs", ["jade-docs-html"]);

// build default.html;
gulp.task("jade-docs-html", ["jade-docs-content"], function () {
    gulp.src(config.template)
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(jade({
            "pretty": "    ", // use 4 spaces for an indent;
            "compileDebug": true,
            "locals": {
                "content": content // contains module and page information;
            }
        }))
        .pipe(gulp.dest(config.dest));
});

// build the content for default.html;
// this is done by populating the "content" object;
gulp.task("jade-docs-content", function () {
    // clear it each time we run this task so it doesn't keep growing (with duplicate content);
    content = {
        "pages": [],
        "modules": []
    };
    
    return gulp.src(config.paths)
        // add plumber for error catching;
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(tap(function (fileVinylObject, t) {
                // path of the module or page;
            var path = fileVinylObject.path.replace(fileVinylObject.path.split("/").pop(), ""),
                // path passed into Jade;
                folder = fileVinylObject.relative.replace(fileVinylObject.relative.split("/").pop(), ""),
                filename = folder.slice(0, - 1) + ".html",
                // read the contents of that directory;
                directory = fs.readdirSync(path),
                // create an object for each module/page;
                item = {
                    "json": [],
                    "jade": [],
                    "js":   [],
                    "scss": [],
                    "md":   [],
                    "folder": folder,
                    // rename some folders (so they modules makes sense as a folder, not as a single page);
                    // same with pages;
                    // then convert all slashes to dashes;
                    "page": filename.replace("modules", "module").replace(/\//g, "-"),
                    "title": "[empty]"
                };
            
            // now that we're in the proper folder for this piece of documentation;
            // let's record what we have available;
            // while this framework has suggestions for filenames, there will be variants;
            
            // loop through each file for this module/page, and record what's available;
            // we'll use this information in the documentation during display;
            directory.map(function (file) {
                var extension = getExtension(file),
                    readme,
                    folderArray,
                    newFilename;
                
                // if this extension is of a file to store;
                // we dont care about EVERY file, only every file we care about;
                if (item.hasOwnProperty(extension)) {
                    // and we dont care about documentation jade files;
                    // no need to document the documentation;
                    if (file !== "demo.jade") {
                        item[extension].push(file);
                    }
                    // if this is a jade PAGE, then we want to record the filename;
                    if (file.indexOf(".jade") > -1 && file.indexOf("page") === 0) {
                        if (file === "page.jade") {
                            // myFolder/myPage/page.jade --> page-myFolder-myPage.html
                            item.page = filename.replace("pages", "page").replace(/\//g, "-");
                        } else {
                            folderArray = folder.slice(0, -1).split("/").splice(1);
                            newFilename = "page";
                            folderArray.map(function (folder) {
                                newFilename = newFilename + "-" + folder;
                            });
                            newFilename = newFilename + file.replace("page-", "-").replace(".jade", ".html");
                            item.page = newFilename;
                        }
                    }
                }
                
                // if this file is the readme;
                if (file === "readme.md") {
                    // grab the first line (the title);
                    readme = fs.readFileSync(fileVinylObject.path).toString().split("\n");
                    // so we can save it for our modules / pages object;
                    item.title = readme[0].replace("# ", "");
                }
            });
            
            // after recording all pertinent information about this module/page, save it;
            if (folder.indexOf("pages/") > -1) {
                item.jade.map(function (newItem) {
                    content.pages.push(item);
                });
            } else {
                content.modules.push(item);
            }
        }));
});
