var gulp   = require("gulp"),
    config = require("../config.js").watch;

gulp.task("watch", function () {
    gulp.watch(config.jade, ["jade:dist"]);
    gulp.watch(config.scss, ["scss:dist"]);
    gulp.watch(config.js,   ["js:dist"]);
    gulp.watch(config.copy, ["copy:dist"]);
});
