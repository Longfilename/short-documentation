var gulp   = require("gulp"),
    config = require("../config.js").copy,
    run    = require("run-sequence"),      // run gulp tasks in sequence;
    size   = require("gulp-size");         // report on file sizes;
    // defines which destination to use (reset in a gulp task);
    compileConfig = {
        "src": config.compile.dist,
        "dest": config.dest.dist
    };

// run both documentation and distribution builds;
gulp.task("copy", function (callback) {
    run(
        "copy:dist",
        "copy:docs",
        callback
    );
});

// copy over files that don't need to be processed (for the distribution build);
gulp.task("copy:dist", function (callback) {
    compileConfig = {
        "src": config.compile.dist,
        "dest": config.dest.dist
    };
    return run(
        "copy:files",
        callback
    );
});

// copy over files that don't need to be processed (for the documentation build);
gulp.task("copy:docs", function (callback) {
    compileConfig = {
        "src": config.compile.docs,
        "dest": config.dest.docs
    };
    return run(
        "copy:files",
        callback
    );
});

// copy the files from src to dest;
gulp.task("copy:files", function () {
    return gulp.src(compileConfig.src)
        .pipe(size())
        .pipe(gulp.dest(compileConfig.dest));
});
