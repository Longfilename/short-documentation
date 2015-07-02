var gulp = require("gulp"),
    run  = require("run-sequence"); // run gulp tasks in sequence;

gulp.task("default", function (callback) {
    run(
        "build",       // build and copy all files;
        "browsersync", // start up a web server;
        "watch",       // start watching files for changes - so we can push updates to browsersync;
        "open",        // open our starting URL in a browser;
        callback
    );
});

gulp.task("dist", function (callback) {
    run(
        "build:dist",
        "browsersync",
        "watch:dist",
        "open:dist",
        callback
    );
});

gulp.task("docs", function (callback) {
    run(
        "build:docs",
        "browsersync",
        "watch:docs",
        "open:docs",
        callback
    );
});
