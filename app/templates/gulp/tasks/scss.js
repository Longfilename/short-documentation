var gulp            = require("gulp"),
    config          = require("../config").scss,
    plumber         = require("gulp-plumber"),             // error trapping so an error doesn't kill Gulp;
    browserSync     = require("browser-sync"),             // update content in the browser;
    scss            = require("gulp-sass"),                // SCSS to CSS conversion;
    scssLint        = require("gulp-scss-lint"),           // verify the SCSS is written properly; 
    scssLintStylish = require("gulp-scss-lint-stylish"),   // reporter for scssLint;
    gulpFilter      = require("gulp-filter"),              // remove some files from the glob (and add them back);
    autoprefixer    = require("gulp-autoprefixer"),        // add browser prefixes to the CSS;
    sourcemaps      = require("gulp-sourcemaps"),          // generate source maps for the SCSS;
    size            = require("gulp-size"),                // report on file sizes;
    run             = require("run-sequence"),             // run gulp tasks in sequence;
    handleErrors    = require("../helpers/handle-errors"), // function to fire on error;
    compileConfig   = {};                                  // contain settings for dist/docs compilation;

// start the chain to execute all the SCSS tasks;
gulp.task("scss", function (callback) {
    run(
        "scss:dist",
        "scss:docs",
        callback
    );
});

// build the CSS files for the distribution build;
gulp.task("scss:dist", function (callback) {
    // configure the files scss:compile will compile;
    compileConfig.destination = config.dest.dist;
    compileConfig.outputStyle = config.compress.dist ? "compressed" : "nested";
    run(
        "scss:lint",
        "scss:compile",
        callback
    );
});

// build the CSS files for the docs build;
gulp.task("scss:docs", function (callback) {
    // configure the files scss:compile will compile;
    compileConfig.destination = config.dest.docs;
    compileConfig.outputStyle = config.compress.docs ? "compressed" : "nested";
    run(
        "scss:lint",
        "scss:compile",
        callback
    );
});

// verify the SCSS is written properly;
gulp.task("scss:lint", function () {
    return gulp.src(config.linstSrc)
        .pipe(scssLint({
            "config": ".scss-lint.yml",
            "customReport": scssLintStylish
        }));
});

// generate CSS from SCSS (run sprites first so it can generate its SCSS file);
gulp.task("scss:compile", function () {
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
        .pipe(scss({
            outputStyle: compileConfig.outputStyle
        }))
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
        .pipe(gulp.dest(compileConfig.destination));
});
