var gulp   = require("gulp"),
    config = require("../../config").optimize.css,
    minify = require("gulp-minify-css"),
    size   = require("gulp-size");

// copy and minimize CSS files;
gulp.task("optimize:css", function () {
    return gulp.src(config.src)
        .pipe(minify(config.options))
        .pipe(gulp.dest(config.dest))
        .pipe(size());
});
