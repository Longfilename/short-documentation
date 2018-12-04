# <%= projectName %>

* Pug
* TypeScript
* SCSS

Built with [Short Documentation](https://github.com/Longfilename/short-documentation)

This build tool makes use of the `scripts` property of `package.json`. The commands to execute are running external JavaScript files (stored in the `/scripts` folder). This way `package.json` won’t grow excessively large with the commands to build your project.

&nbsp;
&nbsp;

## Contents

+ [Installation](#installation)
+ [Initialization](#installation)
+ [Documentation Configuration](#documentation-configuration)
  + [Component `readme.md`](#sample-component-readmemd)
  + [Component YAML Options](#component-yaml-options)
  + [Template `readme.md`](#sample-template-readmemd)
  + [Template YAML Options](#template-yaml-options)
+ [Editor Configuration](#editor-configuration)
  + [tsconfig.json](#tsconfigjson)
  + [tslint.json](#tslintjson)
  + [typings.json](#typingsjson)
  + [.stylelintrc](#stylelintrc)
  + [.editorconfig](#editorconfig)
+ [BEM](#bem)
+ [Image Compression](#image-compression)

&nbsp;
&nbsp;

## Installation

```bash
npm install -g typescript # install global dependencies
npm install               # install local dependencies (and types)
```

&nbsp;
&nbsp;

## Initialization

```bash
npm start                 # build the project
npm start server          # build the project with a web server, and a watcher
npm start docs            # build the project with documentation
npm start server docs     # build the project with documentation, a web server, and a watcher
```

&nbsp;
&nbsp;

## Documentation Configuration

Short Documentation parses the components and templates folders looking for `readme.md` files. When a `readme.md` file is found, that component or template are included in the documentation app. The `readme.md` is not just a markdown file, it contains some YAML at the top to configure the display of the component or template.

The YAML and Markdown are separated by Node. The YAML is used to configure the documentation navigation and page, the Markdown is content on the documentation page.

&nbsp;

#### Component `README.md`

```markdown
---
nav: Primary Navigation
icons: bars bolt
size: 100%
pug: nav-primary.pug
ts: nav-primary.ts
views:
  - title: Primary Navigation (Home page)
    json: nav-primary--home.json
  - title: Primary Navigation (Article pages)
    json: nav-primary--article.json
---

# Primary Navigation

Interactively procrastinate high-payoff content without backward-compatible data. Quickly cultivate optimal processes and tactical architectures. Completely iterate covalent strategic theme areas via accurate e-markets.

Globally incubate standards compliant channels before scalable benefits. Quickly disseminate superior deliverables whereas web-enabled applications. Quickly drive clicks-and-mortar catalysts for change before vertical architectures.

Credibly reintermediate backend ideas for cross-platform models. Continually reintermediate integrated processes through technically sound intellectual capital. Holistically foster superior methodologies without market-driven best practices.
```

&nbsp;

#### Component YAML Options

```yaml
nav: Component Title                    # used in the documentation navigation;
icons: bars bolt                        # optional. space-delimited list of FontAwesome icons to add in the documentation navigation;
size: 350px                             # optional. default is 100%; CSS width value to apply to the container around the component;
pug: component.pug                      # filename of the component Pug file;
ts: component.ts                        # optional. filename of the component TypeScript file;
views:                                  # list of component views to display (multiple are allowed);
  - title: Component Title (variant)    # title of this view;
    json: component.json                # JSON data used to render this view;
```

&nbsp;

#### Template `README.md`

```markdown
---
nav: Article Pages
icons: file-text-o
pages:
  - title: Privacy Policy
    url: /article--privacy-policy.html
  - title: Terms of Use
    url: /article--terms-of-use.html
  - title: Movie Review
    url: /article--movie-review.html
---

# Article Pages

Interactively procrastinate high-payoff content without backward-compatible data. Quickly cultivate optimal processes and tactical architectures. Completely iterate covalent strategic theme areas via accurate e-markets.

Globally incubate standards compliant channels before scalable benefits. Quickly disseminate superior deliverables whereas web-enabled applications. Quickly drive clicks-and-mortar catalysts for change before vertical architectures.

Credibly reintermediate backend ideas for cross-platform models. Continually reintermediate integrated processes through technically sound intellectual capital. Holistically foster superior methodologies without market-driven best practices.
```

&nbsp;

#### Template YAML Options

```yaml
nav: Template Title                     # used in the documentation navigation;
icons: file-text-o                      # optional. space-delimited list of FontAwesome icons to add in the documentation navigation;
pages:                                  # list of template pages to display (multiple are allowed);
  - title: Template Title (variant)     # title of this page;
    json: template.json                 # JSON data used to render this page;
```

&nbsp;
&nbsp;

## Editor Configuration

#### tsconfig.json

[tsconfig.json &middot; TypeScript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

> The presence of a <code>tsconfig.json</code> file in a directory indicates that the directory is the root of a TypeScript project. The <code>tsconfig.json</code> file specifies the root files and the compiler options required to compile the project.

The `files` referenced in the `tsconfig.json` are not used in compilation. Browserify and tsify are used for complication, and the input/output files are defined in `/scripts/js.js`. The following params are ignored (by tsify):

* declaration
* out
* outDir
* files

&nbsp;

#### tslint.json

[tslint.json &middot; palantir.github.io/tslint](http://palantir.github.io/tslint/usage/tslint-json/)

> TSLint checks your TypeScript code for readability, maintainability, and functionality errors.

Configuration file for TSLint. Linting is not part of the NPM build. [https://atom.io/packages/linter-tslint](Configure your editor to run TSLint.)

&nbsp;

#### .stylelintrc

[Stylelint configuration guide](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md)

> A mighty, modern CSS linter that helps you enforce consistent conventions and avoid errors in your stylesheets.

Configuration file for Stylelint. Linting is not part of the NPM build. [https://stylelint.io/user-guide/complementary-tools/](Configure your editor to run Stylelint.)

&nbsp;

#### .editorconfig

[http://editorconfig.org/](http://editorconfig.org/)

> EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs. The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. EditorConfig files are easily readable and they work nicely with version control systems.

Configuration file for EditorConfig. [http://editorconfig.org/#download](Configure your editor to run EditorConfig.)

&nbsp;
&nbsp;

## BEM

[getbem.com](http://getbem.com/)

> BEM (Block Element Modifier) is a highly useful, powerful and simple naming convention to make your front-end code easier to read and understand, easier to work with, easier to scale, more robust and explicit and a lot more strict.

The HTML and SCSS are built with the BEM methodology. This allows for very flexible components that can be nested and won’t conflict with other components (or 3rd party modules). **BEM modules should not rely upon global styles.**

&nbsp;
&nbsp;

## Image Compression

Compressing images is not part of the build process. Compress `/src/images` with [ImageOptim-CLI](https://github.com/JamieMason/ImageOptim-CLI). ImageOptim-CLI automates the following three OS X applications:

* [ImageOptim](https://imageoptim.com/mac)
* [ImageAlpha](https://pngmini.com/)
* [JPEGmini](http://www.jpegmini.com/)

To use, navigate to the `images` directory and run the following:

```bash
imageoptim -j -a -d ./
```
