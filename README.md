# Short Documentation (Yeoman Generator)

[![Build Status](https://travis-ci.org/Longfilename/short-documentation.svg)](https://travis-ci.org/Longfilename/short-documentation)
[![devDependency Status](https://david-dm.org/Longfilename/short-documentation/dev-status.svg)](https://david-dm.org/Longfilename/short-documentation#info=devDependencies)

Yeoman generator for front-end projects that incorporates documentation. The generated project uses Jade, SCSS, and ES6. The goal of this project organization is to facilitate faster development, and an easier hand-off to the next developer.

## Installation

Install [Yeoman](http://yeoman.io) and the [Short Documentation](https://github.com/Longfilename/ShortDocumentation) generator.

```bash
$ npm install -g yo                            # install yeoman globally;
$ npm install -g generator-short-documentation # install short-documentation globally;
```

## Configuration

* create your project folder
* create a config-yeoman.json file ([sample JSON](./sample-config-yeoman.json))

#### config-yeoman.json

`config-yeoman.json` tells the generator what to build. This JSON file should save you significant time at the beginning of each project by creating all the files and folders you need, and linking them together (like including the proper modules in the page Jade).

```javascript
{
    "project": {
        "name": "my project name"       // name your project, this shows up in the readme;
    },
    "modules": {                        // create an entry for each project module;
        "header": {                     // the key is the folder name for this module;
            "js": true                  // if "js" is true, create module.js for this module;
        },
        "nav": {},                      // a JS file will not be generated for this module;
        "promo": {
            "js": [
                "custom-js-filename-1", // you can also specify custom names for your JavaScript files;
                "custom-js-filename-2"
            ]
        },
        "footer": {}
    },
    "pages": {                          // create an entry for each page in this project;
        "home": [                       // the key is the folder name for this page;
            "header",                   // array of all the modules used in this page;
            "nav",
            "footer"
        ],
        "article": [
            "page-header",
            "nav",
            "promo",
            "page-footer"
        ]
    }
}
```

## Implementation

Navigate to your project folder (that contains `config-yeoman.json`).

```bash
$ yo short-documentation # project files and folders are created;
$ npm install            # project dependencies are installed;
$ gulp                   # run gulp (browser will open a page index, and the documentation);
```

At this point, the `config-yeoman.json` file is no longer needed. A new module, or a new page can be added manually.

## License

MIT
