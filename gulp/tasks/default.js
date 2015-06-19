var gulp = require("gulp"),
    run  = require("run-sequence"); // run gulp tasks in sequence;;

gulp.task("default", function (callback) {
    run(
        "browsersync",
        "watch",
        callback
    );
});
