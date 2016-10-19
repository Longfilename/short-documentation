# <%= projectName %>

* Jade¹
* TypeScript
* SCSS

This build tool makes use of the <code>scripts</code> property of <code>package.json</code>. But, the commands to execute are running external JavaScript files (stored in the <code>/scripts</code> folder). This way <code>package.json</code> won’t grow excessively large with the commands to build your project.

&nbsp;

## Installation

```sh
$ npm install -g typescript typings # install global dependencies
$ npm install                       # install local dependencies (and typings)
$ npm start                         # build the project
$ npm start server                  # build the project and run a local web server (with a watcher)
$ npm start docs                    # build the project with documentation
$ npm start server docs             # build the project with documentation and run a local web server (with a watcher)
```

&nbsp;

## ToDo

* image compression

&nbsp;

## Configuration Files

#### tsconfig.json

[tsconfig.json &middot; TypeScript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

> The presence of a <code>tsconfig.json</code> file in a directory indicates that the directory is the root of a TypeScript project. The <code>tsconfig.json</code> file specifies the root files and the compiler options required to compile the project.

The <code>files</code> referenced in the <code>tsconfig.json</code> are not used in compilation. Browserify and tsify are used for complication, and the input/output files are defined in <code>/scripts/js-typescript.js</code>. The following params are ignored (by tsify):

* declaration
* out
* outDir
* files

&nbsp;

#### tslint.json

[tslint.json &middot; palantir.github.io/tslint](http://palantir.github.io/tslint/usage/tslint-json/)

> TSLint checks your TypeScript code for readability, maintainability, and functionality errors.

Configuration file for TSLint. Linting is not part of the NPM commands. Configure your editor to run TSLint.

&nbsp;

#### typings.json

[github.com/typings/typings](https://github.com/typings/typings)

> Typings is the simple way to manage and install TypeScript definitions. It uses <code>typings.json</code>, which can resolve to the Typings Registry, GitHub, NPM, Bower, HTTP and local files. Packages can use type definitions from various sources and different versions, knowing they will never conflict for users.

&nbsp;

#### .stylelintrc

[Stylelint configuration guide](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md)

> A mighty, modern CSS linter that helps you enforce consistent conventions and avoid errors in your stylesheets.

Configuration file for Stylelint. Linting is not part of the NPM commands. Configure your editor to run Stylelint.

&nbsp;

#### .editorconfig

[http://editorconfig.org/](http://editorconfig.org/)

> EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs. The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. EditorConfig files are easily readable and they work nicely with version control systems.

&nbsp;

## BEM

[getbem.com](http://getbem.com/)

> BEM (Block Element Modifier) is a highly useful, powerful and simple naming convention to make your front-end code easier to read and understand, easier to work with, easier to scale, more robust and explicit and a lot more strict.

The HTML and SCSS are built with the BEM methodology. This allows for very flexible modules that can be nested and won’t conflict with other modules. Mixins have been added to the project that allow the dev to apply a CSS reset each BEM module, as opposed to applying a CSS reset to the site. **BEM modules should not rely upon global styles.**


&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

---

¹ [Jade](https://github.com/jadejs/jade) is still in use because [Pug](https://github.com/pugjs/pug) is still in alpha (as of June 1)
