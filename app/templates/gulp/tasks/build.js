var gulp = require("gulp"),
    run  = require("run-sequence"); // run gulp tasks in sequence;

// run both dist and docs builds;
gulp.task("build", function (callback) {
    run(
        "build:dist",
        "build:docs",
        callback
    );
});

// run all tasks needed for a build (in order);
gulp.task("build:dist", function (callback) {
    run(
        "clean:dist",
        "jade:dist",
        "js:dist",
        "scss:dist",
        "copy:dist",
        callback
    );
});

gulp.task("build:docs", function (callback) {
    run(
        "clean:docs",
        "jade:docs",
        "js:docs",
        "scss:docs",
        "copy:docs",
        callback
    );
});
