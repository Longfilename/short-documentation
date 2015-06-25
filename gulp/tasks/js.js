var gulp          = require("gulp"),
    config        = require("../config").js,
    compileConfig = {
        "dest": config.dest.dist
    },
    rename        = require("../rename-js"),
    path          = require("path"),
    Builder       = require("systemjs-builder"),
    shell         = require("gulp-shell"),
    exec          = require('child_process').exec,
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
                "<%= generateBundleCommand(file) %>",   // save the config for this bundle;
                "<%= generateBundleSfxCommand(file) %>" // create self executing file based off this bundle;
            ],
            {
                templateData: {
                    generateBundleCommand: function (file) {
                        var input, output, command;
            
                        // file to parse;
                        input = file.path.toString().replace(file.cwd + "/", "").replace(".js", "");
                        // where to put the generated content;
                        // if this file is our common.js, leave the filename alone;
                        output = (file.path.toString().indexOf(config.common) > -1) ? config.common.split("/").pop() : rename(file);
                        output = compileConfig.dest + "/" + output;
                        // command to generate the compiled JS;
                        //command = "jspm bundle " + input + " - " + config.common.replace(".js", "") + " " + output + " --inject";
                        command = "jspm bundle " + input + " " + output + " --inject";
                        
                        return command;
                    },
                    generateBundleSfxCommand: function (file) {
                        var input, output, command;
            
                        // file to parse;
                        input = file.path.toString().replace(file.cwd + "/", "").replace(".js", "");
                        // where to put the generated content;
                        // if this file is our common.js, leave the filename alone;
                        //output = (file.path.toString().indexOf(config.common) > -1) ? config.common.split("/").pop() : rename(file);
                        output = compileConfig.dest + "/" + rename(file);
                        // command to generate the compiled JS;
                        command = "jspm bundle-sfx " + input + " " + output;
            
                        return command;
                    }
                }
            }
        ));
});

gulp.task("yyy", function () {
    var commands = [];
    
    require("../../config.js");
    
    Object.keys(System.bundles).map(function (bundleKey) {
        var command = "";
        System.bundles[bundleKey].map(function (filePath) {
            var filename = filePath.replace("file:///", "").replace(".js", "");
    
            command = (command.length === 0) ? "jspm bundle-sfx " : command + " + ";
            command = command + filename;
        });
    
        command = command + " " + bundleKey + ".js";
    
        commands.push(command);
    });
    
    commands.map(function (buildCommand) {
        exec(buildCommand);
    });
});

gulp.task("xxx", function () {
    var Builder = require("systemjs-builder");
    
    var builder = new Builder();
    
    builder.loadConfig("config.js");
    
    console.log(0);
    var firstTree, secondTree, commonTree;
    
    builder.trace("dist/js/page-article")
        .then(function(trace) {
            console.log(1);
            firstTree = trace.tree;
            
            return builder.trace("dist/js/page-contact-form");
        })
        .then(function(trace) {
            console.log(2);
            secondTree = trace.tree;
            commonTree = Builder.intersectTrees(firstTree, secondTree);
            
            firstTree = Builder.subtractTrees(firstTree, commonTree);
            secondTree = Builder.subtractTrees(secondTree, commonTree);
            
            return builder.buildTree(firstTree, "first-bundle.js");
        })
        .then(function() {
            console.log(3);
            return builder.buildTree(secondTree, "second-bundle.js");
        })
        .then(function() {
            console.log(4);
            return builder.buildTree(commonTree, "shared-bundle.js");
        });
});

