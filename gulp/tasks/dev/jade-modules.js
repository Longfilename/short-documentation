var gulp         = require("gulp"),
    config       = require("../../config.js").jade.modules,
    jade         = require("gulp-jade"),           // translate jade into HTML;
    tap          = require("gulp-tap"),            // allows us access to the generated HTML;
    plumber      = require("gulp-plumber"),        // error trapping so an error doesn't kill Gulp;
    rename       = require("gulp-rename"),         // so we can create multiple HTML files off one jade file;
    handleErrors = require("../../handle-errors"); // function to fire on error;

gulp.task("jade-modules", ["jade-pages"], function () {
    // we'll use this config for two jade functions;
    var jadeConfig = {
        "pretty": "    ", // use 4 spaces for an indent;
        "compileDebug": true
    };
    
    return gulp.src(config.module)
        // add plumber for error catching;
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        // compile the jade;
        // cf. http://jade-lang.com/api/
        .pipe(jade(jadeConfig))
        .pipe(tap(function (file, t) {
                // start building the filename for the page we'll create for this module;
            var newFileName = "module-",
                // create a new object to work with so module values don't get stored in a global (to this function) obj;
                localJadeConfig = {
                    "pretty": jadeConfig.pretty,
                    "compileDebug": jadeConfig.compileDebug
                };
            
            // get the folder path of the module;
            newFileName = newFileName + file.path.toString().replace(file.cwd + "/" + config.src + "/modules/", "");
            
            // remove the HTML portion (we're going to create our own);
            newFileName = newFileName.replace("/demo.html", ".html");
            
            // convert slashes to dashes;
            newFileName = newFileName.replace("/", "-");
            
            // convert:
            // Users/jdoe/myProject/src/modules/moduleName/demo.jade
            // to:
            // Users/jdoe/myProject/docs/pages/module-moduleName.html
            // so when we do a build of the documentation iframe page (with this module's content being passed in);
            // we'll be able to generate a unique HTML page for this module;
            
            // update the config to include the module HTML;
            localJadeConfig.locals = {
                "content": file.contents.toString()
            };
            
            // now parse the documentation iframe page with this module content;
            gulp.src(config.iframe)
                .pipe(plumber({
                    errorHandler: handleErrors
                }))
                .pipe(jade(localJadeConfig))
                // one template (config.iframe) becomes many HTML pages (one per module);
                .pipe(rename(newFileName))
                .pipe(gulp.dest(config.dest));
        }));
});
