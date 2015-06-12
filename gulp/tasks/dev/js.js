var gulp         = require("gulp"),
    config       = require("../../config").js,
    browserSync  = require("browser-sync"),
    browserify   = require("browserify"),
    buffer       = require("vinyl-buffer"),
    factor       = require("factor-bundle"),
    size         = require("gulp-size"),
    source       = require("vinyl-source-stream"),
    fs           = require("fs"),
    mkdirp       = require("mkdirp"),
    plumber      = require("gulp-plumber"),        // error trapping so an error doesn't kill Gulp;
    handleErrors = require("../../handle-errors"); // function to fire on error;

// step 1 (create folders);
gulp.task("js-create-folders", function () {
    var makeDir = function (directory) {
            return mkdirp(directory, function (err) {
                if (err) {
                    console.log("error!");
                    console.error (err)
                } else {
                    console.log("Directory created: " + directory);
                }
            });
        };
    
    // before we execute JS parsing, we need to create some folders for browserify to work with;
    makeDir(config.dest.build);
    makeDir(config.dest.docs);
});

// step 2 (create empty files used in a merge in step 3);
gulp.task("js-create-files", ["js-create-folders"], function () {
    var makeFiles = function (fileArray) {
            return fileArray.forEach(function (filename) {
                fs.writeFile(filename, "", function (err) {
                    if (err) {
                        console.log("error!!");
                        console.error(err)
                    } else {
                        console.log("File created: ", filename);
                    }
                });
            });
        },
        allBuildFiles = config.output.build.concat("./" + config.dest.build + "/" + config.common),
        allDocFiles = config.output.docs.concat("./" + config.dest.docs + "/" + config.common);
    
    // before we execute JS parsing, we need to create some files for browserify to work with;
    makeFiles(allBuildFiles);
    makeFiles(allDocFiles);
});

// step 3 (concat all the JS files - common.js needs to be created first);
gulp.task("js-browserify", ["js-create-files"], function () {
    // tell the user what's were doing;
    browserSync.notify("Compiling JavaScript");
    
    return browserify({
            "entries": config.input
        })
        // opts.o or opts.outputs should be an array that pairs up with the files array;
        // to specify where each bundle output for each entry file should be written.
        // The elements in opts.o can be string filenames or writable streams.
        // opts.entries or opts.e should be the array of entry files to create a page-specific bundle for each file.
        // If you don't pass in an opts.entries, this information is gathered from browserify itself.
        .plugin(factor, {
            "outputs": config.output.build
        })
        // turn stream of files into a vinyl object (so gulp can play with it); 
        .bundle()
        // add the common file we'll be outputing JS to;
        // this file needs to exist before we move forward;
        .pipe(source(config.common))
        // some gulp plugins do not support streaming file contents;
        // this is the work around;
        .pipe(buffer())
        // add plumber for error catching;
        .pipe(plumber({
            "errorHandler": handleErrors
        }))
        // report the size;
        .pipe(size(config.showFiles))
        // finally put the compiled js;
        // in the build folder;
        .pipe(gulp.dest(config.dest.build))
        // and the docs folder;
        .pipe(gulp.dest(config.dest.docs))
        // tell browserSync to reload the page;
        .pipe(browserSync.reload({
            stream: true
        }));
});

// start the chain to execute all the JS tasks (step 1 through 3);
// managed the order by dependencies;
gulp.task("js", ["js-browserify"]);
