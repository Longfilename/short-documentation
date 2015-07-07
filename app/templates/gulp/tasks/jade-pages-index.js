var gulp         = require("gulp"),
    config       = require("../config.js").jade.index,
    content      = require("../helpers/data-documentation.js"), // parse the JSON files into an object to pass to Jade;
    jade         = require("gulp-jade"),                        // translate jade into HTML;
    rename       = require("gulp-rename"),                      // allows us to rename files;
    plumber      = require("gulp-plumber"),                     // error trapping so an error doesn't kill Gulp;
    run          = require("run-sequence"),                     // run gulp tasks in sequence;
    handleErrors = require("../helpers/handle-errors"),         // function to fire on error;
    // jade configuration settings for both dist and docs;
    configJade   = {
        "pretty": "    ",
        "compileDebug": true,
        "locals": {
            "content": content()
        }
    },
    // rename these index files to "index";
    renameFile = function (path) {
        path.basename = "index";
    };

// build both dist and docs index files;
gulp.task("jade:pages:index", function (callback) {
    // these don't NEED to run in sequence, but I find it easier to debug when they're in order;
    run(
        "jade:pages:index:dist",
        "jade:pages:index:docs",
        callback
    );
});

// build the distribution index file;
gulp.task("jade:pages:index:dist", function () {
    gulp.src(config.dist.template)
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(jade(configJade))
        .pipe(rename(renameFile))
        .pipe(gulp.dest(config.dist.dest));
});

// build the documentation index file;
gulp.task("jade:pages:index:docs", function () {
    gulp.src(config.docs.template)
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(jade(configJade))
        .pipe(rename(renameFile))
        .pipe(gulp.dest(config.docs.dest));
});
