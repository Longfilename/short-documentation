var gulp = require("gulp"),
    runSequence = require("run-sequence"); // run gulp tasks in sequence;

gulp.task("jade", function (callback) {
    // these don't NEED to run in sequence, but I find it easier to debug when they're in order;
    runSequence(
        "jade:modules",
        "jade:pages",
        callback
    );
});
