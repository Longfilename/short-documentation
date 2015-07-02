var gulp         = require("gulp"),
    config       = require("../config.js").jade,
    content      = require("../data-content.js"),  // parse the JSON files into an object to pass to Jade;
    renameFile   = require("../rename-module.js"), // transform a filename object from gulp-tap;
    jade         = require("gulp-jade"),           // translate jade into HTML;
    tap          = require("gulp-tap"),            // allows us access to the generated HTML;
    plumber      = require("gulp-plumber"),        // error trapping so an error doesn't kill Gulp;
    rename       = require("gulp-rename"),         // so we can create multiple HTML files off one jade file;
    handleErrors = require("../handle-errors");    // function to fire on error;

// run jade-json first to make sure the global variable has been created;
gulp.task("jade:modules", function () {
    // we'll use this config for two jade functions;
    var jadeConfig = {
        "pretty": "    ",
        "compileDebug": true,
        "locals": {
            "json": content() // bring in JSON files as a "locals.json" variable in Jade;
        }
    };
    
    return gulp.src(config.modules.module)
        // add plumber for error catching;
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        // compile the jade;
        // cf. http://jade-lang.com/api/
        .pipe(jade(jadeConfig))
        .pipe(tap(function (file, t) {
            // filename for the page we'll create for this module;
            var newFilename = renameFile(file);
            
            // create a new object to work with so module values don't get stored in a global (to this function) obj;
            // make sure to clear whatever was already there (otherwise variables bleed across modules);
            jadeConfig.locals = {};
            jadeConfig.locals.html = file.contents.toString();
            
            // now parse the documentation iframe page with this module content;
            gulp.src(config.modules.iframe)
                .pipe(plumber({
                    errorHandler: handleErrors
                }))
                .pipe(jade(jadeConfig))
                // one template (config.modules.iframe) becomes many HTML pages (one per module);
                .pipe(rename(newFilename))
                .pipe(gulp.dest(config.modules.dest));
        }));
});
