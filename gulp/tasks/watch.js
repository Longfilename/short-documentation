var gulp   = require("gulp"),
    config = require("../config.js").watch;

gulp.task("watch", function () {
    gulp.watch(config.jade, ["jade"]);
    gulp.watch(config.scss, ["scss"]);
    gulp.watch(config.js,   ["js"]);
    gulp.watch(config.copy, ["copy"]);
});
