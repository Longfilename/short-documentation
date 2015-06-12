var gulp        = require("gulp"),
    runSequence = require("run-sequence");

// run all tasks needed for a build (in order);
gulp.task("build", function (callback) {
    // first run clean;
    runSequence(
        "clean",
        [
            // then run these;
            "copy"
        ],
        [
            // then run these;
            "js",
            "scss",
            "jade"
        ],
        // then do the callback;
        callback
    );
});
