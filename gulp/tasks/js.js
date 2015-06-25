var gulp          = require("gulp"),
    config        = require("../config").js,
    compileConfig = {
        "outputs": config.output.dist,
        "destination": config.dest.dist
    },
    babelify      = require("babelify"),
    browserSync   = require("browser-sync"),
    browserify    = require("browserify"),
    buffer        = require("vinyl-buffer"),
    factor        = require("factor-bundle"),
    size          = require("gulp-size"),
    source        = require("vinyl-source-stream"),
    path          = require("path"),
    fs            = require("fs"),
    mkdirp        = require("mkdirp"),
    run           = require("run-sequence"),        // run gulp tasks in sequence;
    plumber       = require("gulp-plumber"),        // error trapping so an error doesn't kill Gulp;
    handleErrors  = require("../handle-errors");    // function to fire on error;

var file = require("file");

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
        "outputs": config.output.dist,
        "destination": config.dest.dist
    };
    run(
        "js:empty:folders",
        "js:empty:files",
        "js:compile",
        callback
    );
});

// build the JS files for the docs build;
gulp.task("js:docs", function (callback) {
    compileConfig = {
        "outputs": config.output.docs,
        "destination": config.dest.docs
    };
    run(
        "js:empty:folders",
        "js:empty:files",
        "js:compile",
        callback
    );
});

// create empty folders, so we can put empty files in them;
gulp.task("js:empty:folders", function () {
    mkdirp.sync(compileConfig.destination, function (err) {
        if (err) {
            console.error (err)
        }
    });
});

// create empty files so factor-bundle has files to work with;
gulp.task("js:empty:files", function () {
    // merge the path and filename so Node knows what file to create;
    var files = compileConfig.outputs.concat("./" + compileConfig.destination + "/" + config.common);
    
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

// concat all the JS files;
gulp.task("js:compile", function () {
    // tell the user what's were doing;
    browserSync.notify("Compiling JS");
    
    return browserify({
            "entries": config.input,
            "extensions": ['.js', '.json', '.es6']
        })
        .transform(babelify.configure({
            extensions: ['.js', '.json', '.es6']
        }))
        // opts.o or opts.outputs should be an array that pairs up with the files array;
        // to specify where each bundle output for each entry file should be written.
        // The elements in opts.o can be string filenames or writable streams.
        // opts.entries or opts.e should be the array of entry files to create a page-specific bundle for each file.
        // If you don't pass in an opts.entries, this information is gathered from browserify itself.
        .plugin(factor, {
            "entries": config.input,
            "outputs": compileConfig.outputs
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
        .pipe(size(config.showFiles))
        // finally put the compiled js;
        // and the docs folder;
        .pipe(gulp.dest(compileConfig.destination))
        // tell browserSync to reload the page;
        .pipe(browserSync.reload({
            "stream": true
        }));
});

gulp.task("js:xxx", function () {
        // all the config we need for browserify;
    var fileArray = {
            // the input files;
            "input": [],
            // and where we want them built;
            "output": {
                "dist": [],
                "docs": []
            }
        },
        // what to do with each folder we're looking through;
        parseFolder = function (folder, dirs, files) {
            // if we have files, loop through them;
            (files.length) && files.forEach(function (file, index) {
                var path, filename;
                
                // if we're actually dealing with a JS file (that doesn't start with an underscore);
                if (file.indexOf(".js") > 0 && file.indexOf("_") !== 0) {
                    filename = file;
                    // now remove the part of the path we don't care about (src/page by default);
                    path = folder.replace(config.xxxPaths.input, "") + "/";
                    // create the proper path to the file;
                    path = config.xxxPaths.input + path + filename;
                    // save this file for browerify to use as an input;
                    fileArray.input.push(path);
                    
                    // generate the filename we'll publish as (for both dist and docs);
                    // /folder1/folder2/page.js ==> page-folder1-folder2.js;
                    path = folder.replace(config.xxxPaths.input, "");
                    filename = "page-" + path.replace("_", "-").replace(/\//g, "-") + ".js";
                    
                    path = config.xxxPaths.output.dist + filename;
                    fileArray.output.dist.push(path);
                    
                    path = config.xxxPaths.output.docs + filename;
                    fileArray.output.docs.push(path);
                }
            });
        };
    
    // go through the file system, grab all data JSON files and put the values into this object;
    file.walkSync(config.xxxPaths.input, parseFolder);
    
    console.log(fileArray);
    
    // return all the data we collected;
    return fileArray;
});


