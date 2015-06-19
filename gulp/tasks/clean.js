var gulp   = require("gulp"),
    config = require("../config").clean, // config for this module;
    del    = require("del"),             // deletes files and folders;
    run    = require("run-sequence");    // run gulp tasks in sequence;

// delete previously generated files so we can put new generated files in an empty folder;
gulp.task("clean", function (callback) {
    // these don't NEED to run in sequence, but I find it easier to debug when they're in order;
    run(
        "clean:docs",
        "clean:dist",
        callback
    );
});

gulp.task("clean:docs", function (callback) {
    del(config.docs, callback);
});

gulp.task("clean:dist", function (callback) {
    del(config.dist, callback);
});
