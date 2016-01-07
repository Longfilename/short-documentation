var gulp   = require("gulp"),
    config = require("../config").open,
    run    = require("run-sequence"), // run gulp tasks in sequence;
    open   = require("gulp-open");    // we can open specific URLs (not just server root);

// open our custom index file for easy access to the dist, and the docs;
// by default, we open up the dist URL;
gulp.task("open", function (callback) {
    run(
        "open:dist",
        "open:docs",
        callback
    );
});

gulp.task("open:dist", function () {
    gulp.src(__filename)
        .pipe(open({
            uri: config.url.dist
        }));
});

gulp.task("open:docs", function () {
    gulp.src(__filename)
        .pipe(open({
            uri: config.url.docs
        }));
});
