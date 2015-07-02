var gulp   = require("gulp"),
    config = require("../config").clean,
    del    = require("del"),          // deletes files and folders;
    run    = require("run-sequence"); // run gulp tasks in sequence;

// delete previously generated files so we can put new generated files in an empty folder;
// to clean both, delete the parent folder (build);
gulp.task("clean", function (callback) {
    del(config.docs.split("/")[0], callback);
});

gulp.task("clean:docs", function (callback) {
    del(config.docs, callback);
});

gulp.task("clean:dist", function (callback) {
    del(config.dist, callback);
});
