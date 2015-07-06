# Short Documentation

[Yeoman](http://yeoman.io) generator for front-end projects that incorporates documentation. The generated project uses Jade, SCSS, and ES6. The goal of this project organization is to facilitate faster development, and an easier hand-off to the next developer.

## Installation

Install [Yeoman](http://yeoman.io) and the Short Documentation generator.

```bash
$ npm install -g yo
$ npm install -g generator-short-documentation

# create your project folder
# create a config-yeoman.json file
# from that folder, run the following:

$ yo short-documentation
$ npm install
$ gulp
```

### config-yeoman.json

The filename needs to be config-yeoman.json for the generator to work ([sample JSON](./sample-config-yeoman.json)). This config file tells the generator what to build. This JSON file should save you 30min to an hour at the beginning of each project by creating all the files and folders you need, and linking them together (like including the proper modules in the page Jade).

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

## modules

Each module (or block/component/widget) is intended to be self-contained. If you need to find the JS that impacts the header module, look in the "header" folder. Need to alter the style of the header module? Look in the "header" folder.

## pages

Following a similar approach to modules, pages are intended to be self-contained. The primary difference, pages don't have page-specific SCSS (all CSS is compiled into one "site.css" file for every page to load).

## License

MIT
