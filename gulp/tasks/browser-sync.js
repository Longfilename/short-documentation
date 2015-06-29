var gulp        = require("gulp"),
    config      = require("../config").browsersync,
    browserSync = require("browser-sync"); // synchronised browser testing;

// run the build task and start a server with BrowserSync;
gulp.task("browsersync", function () {
    browserSync(config);
});
