var gulp   = require("gulp"),
    config = require("../../config").clean, // config for this module;
    del    = require("del");                // deletes files and folders;

// delete previously generated files so we can put new generated files in an empty folder;
gulp.task("clean", function (callback) {
    del(config.src, callback);
});
