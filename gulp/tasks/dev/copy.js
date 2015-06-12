var gulp   = require("gulp"),
    config = require("../../config.js").copy, // configuration for this module;
    size   = require("gulp-size");            // report on file sizes;

// copy over files that don't need to be processed;
gulp.task("copy-docs", function (callback) {
    return gulp.src(config.compile.docs)
        // report on their sizes;
        .pipe(size())
        // put a copy of the files;
        // in the docs folder;
        .pipe(gulp.dest(config.dest.docs));
    
    // without the callback, this is run synchronously;
});

// docs and build need different files, so we have two sets of configs, and two tasks;
gulp.task("copy-build", ["copy-docs"], function (callback) {
    return gulp.src(config.compile.build)
        // report on their sizes;
        .pipe(size())
        // put a copy of the files;
        // in the build folder;
        .pipe(gulp.dest(config.dest.build));
    
    // without the callback, this is run synchronously;
});

// run both docs and build;
gulp.task("copy", ["copy-build"]);
