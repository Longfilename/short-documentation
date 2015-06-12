var gulp         = require("gulp"),
    config       = require("../../config").scss,   // configuration for this module;
    plumber      = require("gulp-plumber"),        // error trapping so an error doesn't kill Gulp;
    browserSync  = require("browser-sync"),        // update content in the browser;
    sass         = require("gulp-sass"),           // SCSS to CSS conversion;
    gulpFilter   = require("gulp-filter"),         // remove some files from the glob (and add them back);
    autoprefixer = require("gulp-autoprefixer"),   // add browser prefixes to the CSS;
    sourcemaps   = require("gulp-sourcemaps"),     // generate source maps for the SCSS;
    size         = require("gulp-size"),           // report on file sizes;
    handleErrors = require("../../handle-errors"); // function to fire on error;

// generate CSS from SCSS (run sprites first so it can generate its SCSS file);
gulp.task("scss", ["sprites"], function () {
    // don’t write sourcemaps of sourcemaps;
    var filter = gulpFilter(["*.css", "!*.map"]);
    
    // tell the user what's were doing;
    browserSync.notify("Compiling SCSS");
    
    return gulp.src(config.compile)
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        // build the sourcemaps;
        .pipe(sourcemaps.init())
        // convert SCSS to CSS;
        .pipe(sass())
        // add vendor prefixes to the CSS;
        .pipe(autoprefixer(config.autoprefixer))
        // filter out the map files;
        .pipe(filter)
        // write the sourcemaps to the CSS;
        .pipe(sourcemaps.write(config.maps))
        // restore map files;
        .pipe(filter.restore())
        // report on their sizes;
        .pipe(size())
        // finally put the compiled CSS into a CSS file;
        // in the build folder;
        .pipe(gulp.dest(config.dest.build))
        // and the docs folder;
        .pipe(gulp.dest(config.dest.docs));
});
