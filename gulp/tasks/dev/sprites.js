var gulp        = require("gulp"),
    config      = require("../../config").sprites,
    spriteSmith = require("gulp.spritesmith");

// after sprites is run, a new scss file is created, (so this shoudl run before Sass compiling);
gulp.task("sprites", function () {
    var spriteData = gulp.src(config.src).pipe(spriteSmith(config.options));
    // build the image;
    spriteData.img.pipe(gulp.dest(config.dest.image));
    // build the css;
    spriteData.css.pipe(gulp.dest(config.dest.css));
});
