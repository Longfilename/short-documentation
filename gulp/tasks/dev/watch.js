var gulp   = require("gulp"),
    config = require("../../config.js").watch;

// start browsersync task and then watch files for changes;
gulp.task("watch", ["browsersync"], function () {
    gulp.watch(config.jade, ["jade"]);
    gulp.watch(config.scss, ["scss"]);
    gulp.watch(config.js, ["js"]);
    gulp.watch(config.copy, ["copy"]);
});
