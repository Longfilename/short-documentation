var gulp         = require("gulp"),
    config       = require("../../config.js").jade.documentation,
    jade         = require("gulp-jade"),           // translate jade into HTML;
    fs           = require("fs"),
    tap          = require("gulp-tap"),            // allows us access to the generated HTML;
    plumber      = require("gulp-plumber"),        // error trapping so an error doesn't kill Gulp;
    handleErrors = require("../../handle-errors"); // function to fire on error;

var objects = [],
    getExtension = function (filename) {
        return filename.split(".").pop();
    };

gulp.task("jade-docs-nav-1", function () {
    return gulp.src(config.paths)
        // add plumber for error catching;
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(tap(function (fileVinylObject, t) {
                // path of the module or page;
            var path = fileVinylObject.path.replace(fileVinylObject.path.split("/").pop(), ""),
                // read the contents of that directory;
                directory = fs.readdirSync(path),
                // create an object for each module/page;
                object = {
                    "json": [],
                    "jade": [],
                    "js":   [],
                    "scss": [],
                    "md":   [],
                    "path": path,
                    "title": "[empty]"
                };
            
            // now that we're in the proper folder for this piece of documentation;
            // let's record what we have available;
            // while this framework has suggestions for filenames, there will be variants;
            
            // loop through each file for this module/page, and record what's available;
            // we'll use this information in the documentation during display;
            directory.map(function (file) {
                var extension = getExtension(file),
                    readme;
                
                // if this extension is of a file to store;
                // we dont care about EVERY file, only every file we care about;
                if (object.hasOwnProperty(extension)) {
                    // and we dont care about documentation jade files;
                    // no need to document the documentation;
                    if (file !== "demo.jade") {
                        object[extension].push(file);
                    }
                }
                
                // if this file is the readme;
                if (file === "readme.md") {
                    // grab the first line (the title);
                    readme = fs.readFileSync(fileVinylObject.path).toString().split("\n");
                    // so we can save it for our modules / pages object;
                    object.title = readme[0];
                }
            });
            
            // after recording all pertinent information about this module/page, save it;
            objects.push(object);
        }));
});

gulp.task("jade-docs-nav-2", ["jade-docs-nav-1"], function () {
    console.log(objects);
    
    gulp.src(config.template)
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(jade({
            "pretty": "    ", // use 4 spaces for an indent;
            "compileDebug": true,
            "locals": {
                "content": objects
            }
        }))
        .pipe(gulp.dest(config.dest));
});

gulp.task("jade-docs-nav", ["jade-docs-nav-2"]);
