var gulp         = require("gulp"),
    config       = require("../../config.js").jade,
    jade         = require("gulp-jade"),           // translate jade into HTML;
    rename       = require("gulp-rename"),         // allows us to rename files;
    plumber      = require("gulp-plumber"),        // error trapping so an error doesn't kill Gulp;
    handleErrors = require("../../handle-errors"); // function to fire on error;

// run jade-json first to make sure the global variable has been created;
gulp.task("jade-pages", ["jade-json"], function () {
    // pass in the sass files that we want to compile;
    return gulp.src(config.dist.compile)
        // add plumber for error catching;
        .pipe(plumber({
            "errorHandler": handleErrors
        }))
        // compile the jade;
        // cf. http://jade-lang.com/api/
        .pipe(jade({
            "pretty": "    ", // use 4 spaces for an indent;
            "compileDebug": true,
            "locals": {
                "content": global.json
            }
        }))
        // rename the file;
        .pipe(rename(function (path) {
            var newPath = config.rename(path);
            
            path.basename = newPath.basename;
            path.dirname =  newPath.dirname;
            path.extname =  newPath.extname;
        }))
        // finally put the compiled jade into an HTML file;
        // in the build folder;
        .pipe(gulp.dest(config.dist.dest));
});
