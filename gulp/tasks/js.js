var gulp          = require("gulp"),
    config        = require("../config").js,
    eslint        = require("gulp-eslint"),
    babelify      = require("babelify"),            // ES6 to ES5 conversion;
    browserSync   = require("browser-sync"),        // inform the browser what's going on;
    browserify    = require("browserify"),          // transcode JS;
    buffer        = require("vinyl-buffer"),        // not 100% sure;
    factor        = require("factor-bundle"),       // extract common js functions into a global file;
    size          = require("gulp-size"),           // report on filesize of gulp streams;
    source        = require("vinyl-source-stream"), // adds a file to a gulp stream;
    fs            = require("fs"),                  // allows us to walk a filesystem (and create empty files);
    mkdirp        = require("mkdirp"),              // make directories (so we can make files);
    run           = require("run-sequence"),        // run gulp tasks in sequence;
    plumber       = require("gulp-plumber"),        // error trapping so an error doesn't kill Gulp;
    handleErrors  = require("../handle-errors"),    // function to fire on error;
    js            = require("../data-js")(),        // get the JS files for browserify to work with;
    compileConfig = {};                             // configuration for dist/docs settings;

// start the chain to execute all the JS tasks;
gulp.task("js", function (callback) {
    run(
        "js:dist",
        "js:docs",
        callback
    );
});

// build the JS files for the distribution build;
gulp.task("js:dist", function (callback) {
    compileConfig = {
        "input": js.input.dist,
        "output": js.output.dist,
        "destination": config.paths.dest.dist
    };
    run(
        "js:empty:folders",
        "js:empty:files",
        "js:lint",
        "js:compile",
        callback
    );
});

// build the JS files for the docs build;
gulp.task("js:docs", function (callback) {
    compileConfig = {
        "input": js.input.docs,
        "output": js.output.docs,
        "destination": config.paths.dest.docs
    };
    run(
        "js:empty:folders",
        "js:empty:files",
        "js:compile",
        callback
    );
});

// create empty folders, so we can put empty files in them;
// this will only build the dist or docs at a time - as specified by compileConfig;
gulp.task("js:empty:folders", function () {
    mkdirp.sync(compileConfig.destination, function (err) {
        if (err) {
            console.error (err)
        }
    });
});

// create empty files so factor-bundle has files to work with;
// this will only build the dist or docs at a time - as specified by compileConfig;
gulp.task("js:empty:files", function () {
    // merge the path and filename so Node knows what file to create;
    var files = compileConfig.output.concat(compileConfig.destination + "/" + config.common);
    
    // for each file in the array;
    files.forEach(function (filename) {
        // create an empty file (so browserify doesn't break);
        fs.writeFile(filename, "", function (err) {
            if (err) {
                console.error(err)
            }
        });
    });
});

// ensure the JS files are written in a consistent fashion;
// eshint configuration is in the root: .eslintrc
gulp.task("js:lint", function () {
    return gulp.src(config.linstSrc)
        .pipe(eslint())
        .pipe(eslint.format());
});

// concat all the JS files;
gulp.task("js:compile", function () {
    var extensions = [".js", ".json", ".es6"];
    
    // tell the user what were doing;
    browserSync.notify("Compiling JS");
    
    return browserify({
            "entries": compileConfig.input,
            "extensions": extensions
        })
        .transform(babelify.configure({
            extensions: extensions
        }))
        // opts.o or opts.outputs should be an array that pairs up with the files array;
        // to specify where each bundle output for each entry file should be written.
        // The elements in opts.o can be string filenames or writable streams.
        // opts.entries or opts.e should be the array of entry files to create a page-specific bundle for each file.
        // If you don't pass in an opts.entries, this information is gathered from browserify itself.
        .plugin(factor, {
            "entries": compileConfig.input,
            "outputs": compileConfig.output
        })
        // turn stream of files into a vinyl object (so gulp can play with it); 
        .bundle()
        // add the common file we'll output JS to;
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
        .pipe(size({
            "showFiles": config.reportFilesizes
        }))
        // finally put the compiled js;
        // and the docs folder;
        .pipe(gulp.dest(compileConfig.destination))
        // tell browserSync to reload the page;
        .pipe(browserSync.reload({
            "stream": true
        }));
});
