var gulp         = require("gulp"),
    config       = require("../config.js").jade.documentation,
    content      = require("../data-documentation.js"), // parse the JSON files into an object to pass to Jade;
    jade         = require("gulp-jade"),                // translate jade into HTML;
    plumber      = require("gulp-plumber"),             // error trapping so an error doesn't kill Gulp;
    handleErrors = require("../handle-errors");         // function to fire on error;

// build default.html;
gulp.task("jade:documentation", function () {
    gulp.src(config.template)
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(jade({
            "pretty": "    ",
            "compileDebug": true,
            "locals": {
                "content": content() // contains module and page information;
            }
        }))
        .pipe(gulp.dest(config.dest));
});
