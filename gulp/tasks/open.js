var gulp   = require("gulp"),
    config = require("../config").open,
    open   = require("gulp-open"); // we can open specific URLs (not just server root);

// open our custom index file for easy access to the dist, and the docs;
gulp.task("open", function () {
    gulp.src(config.src)
        .pipe(open("", {
            "url": config.url
        }));
});
