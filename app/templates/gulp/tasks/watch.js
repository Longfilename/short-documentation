var gulp   = require("gulp"),
    config = require("../config.js").watch;

gulp.task("watch", function () {
    gulp.watch(config.jade, ["jade"]);
    gulp.watch(config.scss, ["scss"]);
    gulp.watch(config.js,   ["js"]);
    gulp.watch(config.copy, ["copy"]);
});

gulp.task("watch:dist", function () {
    gulp.watch(config.jade, ["jade:dist"]);
    gulp.watch(config.scss, ["scss:dist"]);
    gulp.watch(config.js,   ["js:dist"]);
    gulp.watch(config.copy, ["copy:dist"]);
});

gulp.task("watch:docs", function () {
    gulp.watch(config.jade, ["jade:docs"]);
    gulp.watch(config.scss, ["scss:docs"]);
    gulp.watch(config.js,   ["js:docs"]);
    gulp.watch(config.copy, ["copy:docs"]);
});
