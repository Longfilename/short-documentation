var gulp   = require("gulp"),
    config = require("../config.js").watch;

// run watches for both the documentation and distribution builds;
gulp.task("watch", function () {
    gulp.watch(config.jade, ["jade"]);
    gulp.watch(config.scss, ["scss"]);
    gulp.watch(config.js,   ["js"]);
    gulp.watch(config.copy, ["copy"]);
});

// watch for any changed files, and if so, run the distribution task for that file type;
gulp.task("watch:dist", function () {
    gulp.watch(config.jade, ["jade:dist"]);
    gulp.watch(config.scss, ["scss:dist"]);
    gulp.watch(config.js,   ["js:dist"]);
    gulp.watch(config.copy, ["copy:dist"]);
});

// watch for any changed files, and if so, run the documentation task for that file type;
gulp.task("watch:docs", function () {
    gulp.watch(config.jade, ["jade:docs"]);
    gulp.watch(config.scss, ["scss:docs"]);
    gulp.watch(config.js,   ["js:docs"]);
    gulp.watch(config.copy, ["copy:docs"]);
});
