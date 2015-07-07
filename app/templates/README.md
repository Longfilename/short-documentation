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

Module, widget, component, block... they're all the same in this context. A box on a wireframe typically maps to a module. e.g. navigation, rail promo, slider, a form. Some modules are very small, some are large single page applications.

#### Module folder contents

###### Module folder contents: JSON

The content that a module displays should not be stored in Jade (or JS, or SCSS). The idea of these modules is easy reusability, so abstract out the content so you can easily swap the content for each iteration of the module. Gulp will make the JSON files available in Jade (so we can use the content when building the HTML files).

The JSON is available in Jade via the `json` variable. In a single iteration module, you can define the content in the module itself (since it never changes):

/src/modules/page-footer/_content.json
```JavaScript
{
    "module": "page-footer"
}
```

/src/modules/page-footer/module.jade
```Jade
- var content = json["page-footer/_content.json"]

div=content.moduleName
```

Generated HTML:
```HTML
<div>page-footer</div>
```

But when you have multiple iterations, define the content in the page so you can use the module repeatedly. This way you don't have to repeat the Jade/HTML whenever there's a new iteration.

```Jade
- var content = json["promo/_feature1.json"]
include ../../modules/promo/module
- var content = json["promo/_feature2.json"]
include ../../modules/promo/module
- var content = json["promo/_feature3.json"]
include ../../modules/promo/module
```

###### Module folder contents: Jade

Modules have the module Jade (`module`, and `module-`), and the documentation Jade (demo, and demo-). The documentation Jade should include wrapper Jade, and then an include to the module Jade so code isn't unnecessarily duplicated.

Module "pages" aren't built for the distribution, just the documentation. Below are examples of how the naming convention is built for the module pages.

```
/src/pages/module/promo/demo.jade             ==> /build/docs/html/module-promo.html
/src/pages/module/promo/demo-foo.jade         ==> /build/docs/html/module-promo-foo.html
/src/pages/module/promo/foo/demo.jade         ==> /build/docs/html/module-promo-foo.html
/src/pages/module/promo/foo/demo-bar.jade     ==> /build/docs/html/module-promo-foo-bar.html
/src/pages/module/promo/foo/bar/demo.jade     ==> /build/docs/html/module-promo-foo-bar.html
/src/pages/module/promo/foo/bar/demo-baz.jade ==> /build/docs/html/module-promo-foo-bar-baz.html
```

###### Module folder contents: JavaScript

If a module is interactive, it'll have a JS file - put all module functionality into this file (or files). If there is shared functionality across multiple modules of very different types, put the JS into the /src/js folder, and import it as needed. If there is shared functionality across multiple modules of similar functionality, nest the modules and put the JS in the parent folder, like `popover.js` in the example below.

```bash
.
└── src
    └── modules
        └── slideshow
            ├── popover.js
            ├── hero
            |   └── module.js
            └── villan
                └── module.js
```

###### Module folder contents: CSS

All module CSS will be contained in the `module.scss` file. Sure, the module will inherit styles from parent elements, but the bulk of the styles should be defined here so the next developer doesn't have to look far and wide to understand how this module is assembled.

###### Module folder contents: Markdown

The readme file is intended to give the next developer a leg up on comprehending this module. This is not intended to be a reiteration of requirements (those are documented elsewhere, right?). This readme is to help understand the history of the module, and why things are the way they are.

#### Module naming conventions

The JSON files should either start with an underscore (to indicate the content is used in Jade parsing) or with a dash (to indicate this JSON file is accessed via Ajax in the browser). JSON files that start with a dash are copied to the distribution folder.

Jade files that start with `demo`, or `demo-` are compiled for the documentation. These Jade files contain wrapper HTML for the module so it displays properly in the documentation application. Modules shouldn't include wrapper structural HTML (unless the structure is necessary for the module). The structural HTML should be in the page Jade. And when the module is to be displayed by itself, in the documentation, the structural HTML comes from the demo files.

Jade files that start with `module`, or `module-` are compiled for both the documentation, and the distribution. These files shouldn't contain content, just HTML and Jade logic.

There should be one `module.js` file (if required, not all modules are interactive). This file is imported into each `page.js` file when needed.

There should one `module.scss` file. This file is imported into `site.scss` (which is compiled to `site.css` and is used on every page).

The `readme.md` file is to capture any information (useful for the next developer on the project) about this module that doesn't easily fit into comments.

## Building a page

#### What is a page?

Pages are stitched together modules with some structural HTML. 

#### Page folder contents

Pages are simpler than modules because pages are collections of modules, no SCSS needed.

###### Page folder contents: Jade

Jade files that start with `page`, or `page-` are compiled for the documentation and distribution builds.

###### Page folder contents: JavaScript

`page.js` should import the JavaScript for all modules that are in this page. There will be duplication across different pages (think primary navigation). The repetitive JS will be factored out into a `common.js` file (defined in the gulp config file). 

###### Page folder contents: Markdown

The `readme.md` file is to capture any information (useful for the next developer on the project) about this page that doesn't easily fit into comments.

#### Page Naming Convention

Documentation pages go through the same renaming pattern, but the destination isn't `/build/dist/`, it's `/build/docs/`.

```
/src/pages/article/page.jade             ==> /build/dist/html/page-article.html
/src/pages/article/page-foo.jade         ==> /build/dist/html/page-article-foo.html
/src/pages/article/foo/page.jade         ==> /build/dist/html/page-article-foo.html
/src/pages/article/foo/page-bar.jade     ==> /build/dist/html/page-article-foo-bar.html
/src/pages/article/foo/bar/page.jade     ==> /build/dist/html/page-article-foo-bar.html
/src/pages/article/foo/bar/page-baz.jade ==> /build/dist/html/page-article-foo-bar-baz.html
```

## Gulp config

Ugh, so much more to talk about here.
