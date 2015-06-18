var gulp = require("gulp"),
    run  = require("run-sequence"); // run gulp tasks in sequence;

gulp.task("jade", function (callback) {
    // these don't NEED to run in sequence, but I find it easier to debug when they're in order;
    run(
        "jade:dist",
        "jade:docs",
        callback
    );
});

gulp.task("jade:dist", function (callback) {
    // these don't NEED to run in sequence, but I find it easier to debug when they're in order;
    run(
        "jade:pages:dist",
        callback
    );
});

gulp.task("jade:docs", function (callback) {
    // these don't NEED to run in sequence, but I find it easier to debug when they're in order;
    run(
        "jade:pages:docs",
        "jade:modules",
        "jade:documentation",
        callback
    );
});
