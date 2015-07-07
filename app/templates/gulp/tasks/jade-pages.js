var gulp          = require("gulp"),
    config        = require("../config.js").jade,
    run           = require("run-sequence"),       // run gulp tasks in sequence;
    jade          = require("gulp-jade"),          // translate jade into HTML;
    rename        = require("gulp-rename"),        // allows us to rename files;
    plumber       = require("gulp-plumber"),       // error trapping so an error doesn't kill Gulp;
    handleErrors  = require("../helpers/handle-errors"),   // function to fire on error;
    content       = require("../helpers/data-content.js"), // parse the JSON files into an object to pass to Jade;
    renameFile    = require("../helpers/rename-page.js"),  // transform a path object from gulp-rename;
    compileConfig = {};                            // defines which destination to use (reset in a gulp task);

// run both documentation and distribution builds;
gulp.task("jade:pages", function (callback) {
    // these don't NEED to run in sequence, but I find it easier to debug when they're in order;
    run(
        "jade:pages:dist",
        "jade:pages:docs",
        callback
    );
});

// build the HTML pages for the distribution build;
gulp.task("jade:pages:dist", function (callback) {
    // define where we want the Jade files to be built;
    compileConfig.dest = config.pages.dest.dist;
    run(
        "jade:pages:compile",
        callback
    );
});

// build the HTML pages for the docs build;
// this does not build HTML pages for modules;
gulp.task("jade:pages:docs", function (callback) {
    // define where we want the Jade files to be built;
    compileConfig.dest = config.pages.dest.docs;
    run(
        "jade:pages:compile",
        callback
    );
});

// compile HTML;
// default state will compile to the dist folder, but the above tasks can change the config;
gulp.task("jade:pages:compile", function () {
    return gulp.src(config.pages.compile)
        .pipe(plumber({
            "errorHandler": handleErrors
        }))
        // create some HTML from Jade;
        // cf. http://jade-lang.com/api/
        .pipe(jade({
            "pretty": "    ",
            "compileDebug": true,
            "locals": {
                "json": content() // bring in JSON files as a "locals.json" variable in Jade;
            }
        }))
        // rename the HTML file;
        .pipe(rename(function (path) {
            var newPath = renameFile(path);
            
            path.basename = newPath.basename;
            path.dirname  = newPath.dirname;
            path.extname  = newPath.extname;
        }))
        // finally put the compiled HTML file in the appropriate folder;
        .pipe(gulp.dest(compileConfig.dest));
});
