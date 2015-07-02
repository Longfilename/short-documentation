# Short Documentation

> [Yeoman](http://yeoman.io) generator

## Getting Started

### Installation

Install [Yeoman](http://yeoman.io) Yeoman and the Short Documentation generator.

```bash
$ npm install -g yo
$ npm install -g generator-short-documentation
```

Create a new folder. Then create the JSON config (filename needs to be config-yeoman.json) file for the generator ([](./sample-config-yeoman.json) sample JSON).

#### config-yeoman.json

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

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-short-documentation from npm, run:

```bash
$ npm install -g generator-short-documentation
```

Finally, initiate the generator:

```bash
$ yo short-documentation
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
