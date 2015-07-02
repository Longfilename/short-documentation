var gulp          = require("gulp"),
    config        = require("../config.js").copy,
    run           = require("run-sequence"), // run gulp tasks in sequence;
    size          = require("gulp-size");    // report on file sizes;

// run both documentation and distribution builds;
gulp.task("copy", function (callback) {
    run(
        "copy:dist",
        "copy:docs",
        callback
    );
});

// copy over files that don't need to be processed (for the distribution build);
gulp.task("copy:dist", function () {
    return gulp.src(config.compile.dist)
        .pipe(size())
        .pipe(gulp.dest(config.dest.dist));
});

// copy over files that don't need to be processed (for the documentation build);
gulp.task("copy:docs", function () {
    return gulp.src(config.compile.docs)
        .pipe(size())
        .pipe(gulp.dest(config.dest.docs));
});
