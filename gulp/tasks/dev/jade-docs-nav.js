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

gulp.task("jade-docs-nav", function () {
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
            
            // console.log(path);
            // console.log(files);
            
            // loop through each file for this module/page, and record what's available;
            // we'll use this information in the documentation during display;
            directory.map(function (file) {
                var extension = getExtension(file),
                    readme;
                
                if (object.hasOwnProperty(extension)) {
                    if (file !== "demo.jade") {
                        object[extension].push(file);
                    }
                }
                
                if (file === "readme.md") {
                    readme = fs.readFileSync(fileVinylObject.path).toString().split("\n");
                    object.title = readme[0];
                }
            });
            
            console.log(object);
            
            objects.push(object);
        }));
});
