// require all tasks in gulp/tasks, including subfolders;
// this allows for all gulp tasks to be executed without needing to specify which files to include;
require("require-dir")("./gulp", {
    recurse: true
});
