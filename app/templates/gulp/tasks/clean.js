var gulp   = require("gulp"),
    config = require("../config").clean,
    del    = require("del"),          // deletes files and folders;
    run    = require("run-sequence"); // run gulp tasks in sequence;

// delete previously generated files so we can put new generated files in an empty folder;
// to clean both, delete the parent folder (build);
gulp.task("clean", function () {
    return del(config.docs.split("/")[0]);
});

gulp.task("clean:docs", function () {
    return del([config.docs]);
});

gulp.task("clean:dist", function () {
    return del([config.dist]);
});
