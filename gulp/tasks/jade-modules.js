var gulp         = require("gulp"),
    config       = require("../config.js").jade,
    jade         = require("gulp-jade"),        // translate jade into HTML;
    tap          = require("gulp-tap"),         // allows us access to the generated HTML;
    plumber      = require("gulp-plumber"),     // error trapping so an error doesn't kill Gulp;
    rename       = require("gulp-rename"),      // so we can create multiple HTML files off one jade file;
    handleErrors = require("../handle-errors"); // function to fire on error;

// run jade-json first to make sure the global variable has been created;
gulp.task("jade-modules", function () {
    // we'll use this config for two jade functions;
    var jadeConfig = {
        "pretty": "    ",
        "compileDebug": true,
        "locals": {
            "json": config.data() // bring in JSON files as a "locals" variable in Jade;
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
            var newFileName;
            
            // create a new object to work with so module values don't get stored in a global (to this function) obj;
            jadeConfig.locals.html = file.contents.toString();
        
            // convert:
            // Users/jdoe/myProject/src/modules/moduleName/demo.jade
            // to:
            // Users/jdoe/myProject/docs/pages/module-moduleName.html
            // so when we do a build of the documentation iframe page (with this module's content being passed in);
            // we'll be able to generate a unique HTML page for this module;
            
            // get the folder path of the module;
            newFileName = "module-" + file.path.toString().replace(file.cwd + "/" + config.modules.src + "/modules/", "");
            
            // remove the HTML portion (we're going to create our own);
            newFileName = newFileName.replace("/demo.html", ".html");
            
            // convert slashes to dashes;
            newFileName = newFileName.replace(/\//g, "-");
            
            // now parse the documentation iframe page with this module content;
            gulp.src(config.modules.iframe)
                .pipe(plumber({
                    errorHandler: handleErrors
                }))
                .pipe(jade(jadeConfig))
                // one template (config.modules.iframe) becomes many HTML pages (one per module);
                .pipe(rename(newFileName))
                .pipe(gulp.dest(config.modules.dest));
        }));
});
