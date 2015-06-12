var gulp        = require("gulp"),
    runSequence = require("run-sequence");

// run all tasks needed for a build in defined order;
gulp.task("build:production", function (callback) {
    runSequence(
        "clean", [
            "jade",
            "images",
            "sass",
            "scripts",
            "fonts",
            "json",
            "extras"
        ],
        "base64", [
            "optimize:css",
            "optimize:js",
            "optimize:images"
        ],
        callback
    );
});
