var gulp         = require("gulp"),
    config       = require("../config.js").jade.index,
    content      = require("../data-documentation.js"), // parse the JSON files into an object to pass to Jade;
    jade         = require("gulp-jade"),                // translate jade into HTML;
    rename       = require("gulp-rename"),              // allows us to rename files;
    plumber      = require("gulp-plumber"),             // error trapping so an error doesn't kill Gulp;
    run          = require("run-sequence"),             // run gulp tasks in sequence;
    handleErrors = require("../handle-errors");         // function to fire on error;

// ;
gulp.task("jade:pages:index", function (callback) {
    // these don't NEED to run in sequence, but I find it easier to debug when they're in order;
    run(
        "jade:pages:index:dist",
        "jade:pages:index:docs",
        callback
    );
});

gulp.task("jade:pages:index:dist", function () {
    gulp.src(config.dist.template)
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(jade({
            "pretty": "    ",
            "compileDebug": true,
            "locals": {
                "content": content() // contains module and page information;
            }
        }))
        // rename the HTML file;
        .pipe(rename(function (path) {
            path.basename = "index";
        }))
        .pipe(gulp.dest(config.dist.dest));
});

// ;
gulp.task("jade:pages:index:docs", function () {
    gulp.src(config.docs.template)
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(jade({
            "pretty": "    ",
            "compileDebug": true,
            "locals": {
                "content": content() // contains module and page information;
            }
        }))
        // rename the HTML file;
        .pipe(rename(function (path) {
            path.basename = "index";
        }))
        .pipe(gulp.dest(config.docs.dest));
});
