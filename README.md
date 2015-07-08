# Short Documentation (Yeoman Generator)

Yeoman generator for the [Short Documentation](./app/templates) project.

Short Documentation is an HTML template and documentation project. The code organization and naming convention allow for a documentation build for minimal effort. Short Documentation uses Jade, SCSS, and ES6, and uses `config-yeoman.json` as a jump start on project development (by building out all the files and folders as defined in the JSON file.

## Installation

Install [Yeoman](http://yeoman.io) and the [Short Documentation](https://github.com/Longfilename/ShortDocumentation) generator.

```bash
$ npm install -g yo                            # install yeoman globally;
$ npm install -g generator-short-documentation # install short-documentation globally;
```

## Configuration

* create your project folder
* create a `config-yeoman.json` file ([sample JSON](./sample-config-yeoman.json))

#### config-yeoman.json

`config-yeoman.json` tells the generator what to build. This JSON file should save you significant time at the beginning of each project by creating most of the files and folders you need, and linking them together (like including the proper modules in the page Jade).

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

At this point, the `config-yeoman.json` file is no longer needed, you can delete it. A new module, or a new page can be added manually.

## License

The code is available under the MIT license.
