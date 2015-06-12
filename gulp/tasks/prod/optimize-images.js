var gulp     = require("gulp"),
    config   = require("../../config.js").optimize.images,
    size     = require("gulp-size"),
    imageMin = require("gulp-imagemin");

gulp.task("optimize:images", function () {
    return gulp.src(config.src)
        // compress the images;
        .pipe(imageMin(config.options))
        // and place them in the build location;
        .pipe(gulp.dest(config.dest))
        // report on the image size;
        .pipe(size());
});
