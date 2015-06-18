var gulp        = require("gulp"),
    runSequence = require("run-sequence");

// run both dist and docs builds;
gulp.task("build", function (callback) {
    // first run clean;
    runSequence(
        "build:dist",
        "build:docs",
        // then do the callback;
        callback
    );
});

// run all tasks needed for a build (in order);
gulp.task("build:dist", function (callback) {
    // first run clean;
    runSequence(
        "clean:dist",
        "jade:dist",
        "js:dist",
        // then do the callback;
        callback
    );
});

gulp.task("build:docs", function (callback) {
    // first run clean;
    runSequence(
        "clean:docs",
        "jade:docs",
        "js:docs",
        // then do the callback;
        callback
    );
});
