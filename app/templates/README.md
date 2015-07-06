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
    ├── modules                           # all modules/components/widgets for this project;
    |   └── [myModule]                    # each module gets its own folder;
    |       ├── _content.json             # content/data - don't put your content into Jade;
    |       ├── demo.jade                 # "page" for the docs, put necessary wrapper HTML around the module so it'll display properly in the documentation;
    |       ├── module.jade               # module HTML;
    |       ├── module.js                 # JavaScript for this module;
    |       ├── module.scss               # CSS for this module;
    |       └── readme.md                 # information to convey to the next developer about this module;
    ├── pages                             # all Jade pages for this project;
    |   ├── _short-documentation          # documentation templates, these shouldn't need to be altered;
    |   |   ├── dist                      # "pages" for the distribution build;
    |   |   |   └── page.jade             # index of all "page" based pages (not documentation module pages);
    |   |   └── docs                      # files for the documentation build;
    |   |       ├── _flex-resize.js       # control the width of the documentation panels;
    |   |       ├── _iframe.jade          # module page template for the documentation; module demo files are compiled, then inserted into this Jade page;
    |   |       ├── _select-files.js      # display the code for the file selected for the selected object (page/module);
    |   |       ├── _select-objects.js    # load the selected page/module page, and update the file SELECT with the selected object's files;
    |   |       ├── pages.css             # CSS used in the documentation (this is not compiled to anywhere);
    |   |       └── page.jade             # root documentation page (contains all documentation content in a JSON object);
    |   |       └── page.js               # aggregate all JavaScript needed for the documentation app;
    |   └── [myPage]                      # each page type gets its own folder;
    |       ├── page.jade                 # page HTML;
    |       ├── page.js                   # JavaScript needed for this page;
    |       └── readme.md                 # information to convey to the next developer about this page;
    └── scss                              # site wide CSS;
        ├── _base.scss                    # base tag CSS, nothing module specific;
        ├── _fonts.scss                   # define the fonts you're including in /src/fonts;
        ├── _mixins.scss                  # SCSS mixins used across the site;
        ├── _variables.scss               # SCSS variables used across the site (colors, widths, breakpoints, etc.);
        └── site.scss                     # include all SCSS files needed for the site;
```

## Building a module

#### What is a module?

Module, widget, component, block... they're all the same in this context. Use wireframes to help define the modules. A box on a wireframe typically maps to a module. e.g. navigation, rail promo, slider, a form. Some modules are very small, some are large single page applications.

#### Module folder contents

##### JSON file(s)

The content that a module displays should not be stored in Jade (or JS, or SCSS). The idea of these modules is easy reusability, so abstract out the content so you can easily swap the content for each iteration of the module. Gulp will make the JSON files available in Jade (so we can use the content when building the HTML files).

The JSON is available in Jade via the "json" variable. In a single iteration module, you can define the content in the module itself (since it never changes):

```JavaScript
{
    "module": "page-footer"
}
```

```Jade
- var content = json["page-footer/_content.json"]

div=content.moduleName
```

```HTML
<div>page-footer</div>
```

But when you have multiple iterations, define the content in the page:

```Jade
- var content = json["promo/_feature1.json"]
include ../../modules/promo/module
- var content = json["promo/_feature2.json"]
include ../../modules/promo/module
- var content = json["promo/_feature3.json"]
include ../../modules/promo/module
```

## Building a page

## Naming Conventions

#### Distribution Pages

Documentation pages go through the same renaming pattern, but the destination isn't /build/dist/, it's /build/docs/.

```
/src/pages/article/page.jade             ==> /build/dist/html/page-article.html
/src/pages/article/page-foo.jade         ==> /build/dist/html/page-article-foo.html
/src/pages/article/foo/page.jade         ==> /build/dist/html/page-article-foo.html
/src/pages/article/foo/page-bar.jade     ==> /build/dist/html/page-article-foo-bar.html
/src/pages/article/foo/bar/page.jade     ==> /build/dist/html/page-article-foo-bar.html
/src/pages/article/foo/bar/page-baz.jade ==> /build/dist/html/page-article-foo-bar-baz.html
```

#### Documentation Modules

Module "pages" don't need to be built for the distribution, just the documentation.

```
/src/pages/module/promo/demo.jade             ==> /build/docs/html/module-promo.html
/src/pages/module/promo/demo-foo.jade         ==> /build/docs/html/module-promo-foo.html
/src/pages/module/promo/foo/demo.jade         ==> /build/docs/html/module-promo-foo.html
/src/pages/module/promo/foo/demo-bar.jade     ==> /build/docs/html/module-promo-foo-bar.html
/src/pages/module/promo/foo/bar/demo.jade     ==> /build/docs/html/module-promo-foo-bar.html
/src/pages/module/promo/foo/bar/demo-baz.jade ==> /build/docs/html/module-promo-foo-bar-baz.html
```
