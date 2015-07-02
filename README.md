# Short Documentation

> [Yeoman](http://yeoman.io) generator

## Getting Started

### Installation

Install [Yeoman](http://yeoman.io) and the Short Documentation generator.

```bash
$ npm install -g yo
$ npm install -g generator-short-documentation

// create your project folder, and create a config-yeoman.json file, from that folder, run yeoman;

$ yo short-documentation
$ npm install
$ gulp
```

#### config-yeoman.json

The filename needs to be config-yeoman.json for the generator ([sample JSON](./sample-config-yeoman.json)).

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

### Continue Installation

```bash
```


## License

MIT
