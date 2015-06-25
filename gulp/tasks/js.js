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
                        var input, output, command;
                        
                        // file to parse;
                        input = file.path.toString().replace(file.cwd + "/", "").replace(".js", "");
                        // where to put the generated content;
                        // if this file is our common.js, leave the filename alone;
                        output = (file.path.toString().indexOf(config.common) > -1) ? config.common.split("/").pop() : rename(file);
                        output = compileConfig.dest + "/" + output;
                        // command to generate the compiled JS;
                        command = "jspm bundle " + input + " - " + config.common.replace(".js", "") + " " + output;
                        
                        return command;
                    }
                }
            }
        ));
});

