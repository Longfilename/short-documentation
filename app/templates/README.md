# Short Documentation

Navigate to your project folder.

```bash
$ npm install # project dependencies are installed;
$ gulp        # run gulp (browser will open a template index (list of all pages), and the documentation);

# or you can run one of the following:

$ gulp dist   # run the templates only (no documentation);
$ gulp docs   # run the documentation only (no templates);
```

## What have I installed?

```bash
.
├── .eslintrc                             # JavaScript lint configuration for "gulp-eslint";
├── .gitignore                            # define the files and directories Git should ignore (all generated files are defined in here);
├── .scss-lint.yml                        # SCSS lint configuration for "gulp-scss-lint";
├── config-yeoman.json                    # configuration file used to generate this project (can be deleted);
├── gulp                                  # Gulp tasks and configuration;
|   ├── config.js                         # settings for Gulp (intended to be edited);
|   ├── data-content.js                   # builds a JS object of module JSON content for Jade parsing (dist);
|   ├── data-documentation.js             # builds a JS object of content for Jade documentation parsing (docs);
|   ├── data-js.js                        # builds a JS object of files to parse, and generate for browserify;
|   ├── handle-errors.js                  # simple error handling for Gulp streams;
|   ├── rename-module.js                  # rename module-based pages for the documentation;
|   ├── rename-page.js                    # rename page-based pages for the documentation, and the distribution;
|   └── tasks                             # tasks for Gulp to run; the files above this folder are configuration settings;
|       ├── browser-sync.js               # web server;
|       ├── build.js                      # build the distribution, and the documentation;
|       ├── clean.js                      # delete the generated files;
|       ├── copy.js                       # straight copy of files that don't need to be parsed;
|       ├── default.js                    # dist, docs, and the default (dist and docs) tasks;
|       ├── jade-modules.js               # build the documentation pages for each "module" in the project;
|       ├── jade-pages-index.js           # build the distribution index page (list of all pages in the project);
|       ├── jade-pages.js                 # build the distribution and documentation pages for each "page" in the project;
|       ├── jade.js                       # run all the Jade tasks;
|       ├── js.js                         # compile ES6 JavaScript to ES5 with browserify, factor-bundle, and babelify;
|       ├── open.js                       # open start pages for the distribution and the documentation;
|       ├── scss.js                       # compile CSS;
|       └── watch.js                      # set watch tasks to trigger rebuilding of assets;
├── gulpfile.js                           # Gulp;
├── package.json                          # NPM;
├── readme.md                             # what you are reading now;
└── src                                   # source files to build the distribution, and the documentation;
    ├── fonts                             # (empty) folder for custom fonts;
    ├── img                               # (empty) folder for project images;
    ├── includes                          # Jade includes to be used across the site;
    |   ├── head.jade                     # HEAD content (typically very repetitive for HTML templates);
    |   └── scripts.jade                  # SCRIPT tags at the bottom of every page;
    ├── js                                # (empty) folder for site wide JS files;
    ├── modules                           #
    |   └── [myModule]                    #
    |       ├── _content.json             #
    |       ├── demo.jade                 #
    |       ├── module.jade               #
    |       ├── module.js                 #
    |       ├── module.scss               #
    |       └── readme.md                 #
    ├── pages                             #
    |   ├── _short-documentation          #
    |   |   ├── dist                      #
    |   |   |   └── page.jade             #
    |   |   └── docs                      #
    |   |       ├── _flex-resize.js       #
    |   |       ├── _iframe.jade          #
    |   |       └── _select-files.js      #
    |   |       ├── _select-objects.js    #
    |   |       ├── pages.css             #
    |   |       └── page.jade             #
    |   |       ├── page.js               #
    |   └── [myPage]                      #
    |       ├── page.jade                 #
    |       ├── page.js                   #
    |       └── readme.md                 #
    └── scss                              #
        ├── _base.scss                    #
        ├── _fonts.scss                   #
        ├── _mixins.scss                  #
        ├── _variables.scss               #
        └── site.scss                     #
```

## Naming Conventions

#### Dist Pages

```
/src/pages/article/page.jade             ==> /dist/html/page-article.html
/src/pages/article/page-foo.jade         ==> /dist/html/page-article-foo.html
/src/pages/article/foo/page.jade         ==> /dist/html/page-article-foo.html
/src/pages/article/foo/page-bar.jade     ==> /dist/html/page-article-foo-bar.html
/src/pages/article/foo/bar/page.jade     ==> /dist/html/page-article-foo-bar.html
/src/pages/article/foo/bar/page-baz.jade ==> /dist/html/page-article-foo-bar-baz.html
```

#### Documentation Pages (same as Dist)

```
/src/pages/article/page.jade             ==> /docs/html/page-article.html
/src/pages/article/page-foo.jade         ==> /docs/html/page-article-foo.html
/src/pages/article/foo/page.jade         ==> /docs/html/page-article-foo.html
/src/pages/article/foo/page-bar.jade     ==> /docs/html/page-article-foo-bar.html
/src/pages/article/foo/bar/page.jade     ==> /docs/html/page-article-foo-bar.html
/src/pages/article/foo/bar/page-baz.jade ==> /docs/html/page-article-foo-bar-baz.html
```

#### Documentation Modules

```
/src/pages/module/promo/demo.jade             ==> /docs/html/module-promo.html
/src/pages/module/promo/demo-foo.jade         ==> /docs/html/module-promo-foo.html
/src/pages/module/promo/foo/demo.jade         ==> /docs/html/module-promo-foo.html
/src/pages/module/promo/foo/demo-bar.jade     ==> /docs/html/module-promo-foo-bar.html
/src/pages/module/promo/foo/bar/demo.jade     ==> /docs/html/module-promo-foo-bar.html
/src/pages/module/promo/foo/bar/demo-baz.jade ==> /docs/html/module-promo-foo-bar-baz.html
```

#### Test image
![FPO Image](http://placehold.it/350x150 "FPO Image")
