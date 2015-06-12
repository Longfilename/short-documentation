var gulp   = require("gulp"),
    config = require("../../config").optimize.js,
    uglify = require("gulp-uglify"),
    size   = require("gulp-size");

gulp.task("optimize:js", function() {
    return gulp.src(config.src)
        // minify the JS files;
        .pipe(uglify(config.options))
        // and place them in the build location;
        .pipe(gulp.dest(config.dest))
        // then report on the image sizes;
        .pipe(size());
});
