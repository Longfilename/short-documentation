var gulp         = require("gulp"),
    config       = require("../config.js").jade,
    content      = require("../json.js"),          // parse the JSON files into an object to pass to Jade;
    lazypipe     = require("lazypipe"),            // allows for reusable parts of a pipeline;
    jade         = require("gulp-jade"),           // translate jade into HTML;
    rename       = require("gulp-rename"),         // allows us to rename files;
    plumber      = require("gulp-plumber"),        // error trapping so an error doesn't kill Gulp;
    handleErrors = require("../handle-errors"), // function to fire on error;
    // defines which destination to use (set in a gulp task);
    selectedDestination,
    // initialize a lazypipe so we can run both prod and docs with the same pipe;
    whichDestination = lazypipe()
        // add plumber for error catching;
        .pipe(function () {
            return plumber({
                "errorHandler": handleErrors
            })
        })
        // create some HTML from Jade;
        // cf. http://jade-lang.com/api/
        .pipe(function () {
            return jade({
                "pretty": "    ",
                "compileDebug": true,
                "locals": {
                    "json": content() // bring in JSON files as a "locals" variable in Jade;
                }
            });
        })
        // rename the HTML file;
        .pipe(function () {
            return rename(function (path) {
                var newPath = config.pages.rename(path);
                
                path.basename = newPath.basename;
                path.dirname = newPath.dirname;
                path.extname = newPath.extname;
            });
        })
        // finally put the compiled HTML file in the appropriate folder;
        .pipe(function () {
            return gulp.dest(selectedDestination);
        });

// build the HTML pages for the distribution build;
gulp.task("jade:pages:dist", function () {
    // define where we want the Jade files to be built;
    selectedDestination = config.pages.dest.dist;
    // pass in the Jade files that we want to compile;
    return gulp.src(config.pages.compile).pipe(whichDestination());
});

// build the HTML pages (based off of pages, modules are built elsewhere) for the docs build;
gulp.task("jade:pages:docs", function () {
    // define where we want the Jade files to be built;
    selectedDestination = config.pages.dest.docs;
    // pass in the Jade files that we want to compile;
    return gulp.src(config.pages.compile).pipe(whichDestination());
});

// run both documentation and distribution builds;
gulp.task("jade:pages", ["jade:pages:dist", "jade:pages:docs"]);
