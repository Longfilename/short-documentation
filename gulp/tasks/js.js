var gulp          = require("gulp"),
    config        = require("../config").js,
    compileConfig = {
        "dest": config.dest.dist
    },
    rename        = require("../rename-js"),
    shell         = require("gulp-shell"),
    browserSync   = require("browser-sync"),
    run           = require("run-sequence"),        // run gulp tasks in sequence;
    plumber       = require("gulp-plumber"),        // error trapping so an error doesn't kill Gulp;
    handleErrors  = require("../handle-errors");    // function to fire on error;

// run both documentation and distribution builds;
gulp.task("js", function (callback) {
    // these don't NEED to run in sequence, but I find it easier to debug when they're in order;
    run(
        "js:dist",
        "js:docs",
        callback
    );
});

// build the JS files for the distribution build;
gulp.task("js:dist", function (callback) {
    // define where we want the JS files to be built;
    compileConfig.dest = config.dest.dist;
    run(
        "js:compile",
        callback
    );
});

// build the JS files for the docs build;
gulp.task("js:docs", function (callback) {
    // define where we want the JS files to be built;
    compileConfig.dest = config.dest.docs;
    run(
        "js:compile",
        callback
    );
});

gulp.task("js:compile", function () {
    return gulp.src(config.src, { read: false })
        .pipe(shell(
            [
                "<%= generateCommand(file) %>"
            ],
            {
                templateData: {
                    generateCommand: function (file) {
                        var input = file.path.toString().replace(file.cwd + "/", "").replace(".js", "");
                        var output = compileConfig.dest + "/" + rename(file);
                        var command = "jspm bundle-sfx " + input + " " + output;
                        
                        return command;
                    }
                }
            }
        ));
});

