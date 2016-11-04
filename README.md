# Short Documentation (Yeoman Generator)

[Yeoman](http://yeoman.io) generator for the [Short Documentation](https://github.com/Longfilename/short-documentation/tree/master/app/templates) project.

Short Documentation is an HTML template and documentation project. The code organization and naming convention allow for a documentation build for minimal effort. Short Documentation uses Jade, SCSS, and TypeScript, and uses `config-yeoman.json` as a jump start on project development (by building out all the files and folders as defined in the JSON file).

## Installation

Install Yeoman and the Short Documentation generator.

```bash
npm install -g yo                             # install yeoman globally;
npm install -g generator-short-documentation  # install the short-documentation generator globally;
```

## Configuration

* create your project folder
* create a `config-yeoman.json` file ([sample JSON](./sample-config-yeoman.json))

#### config-yeoman.json

`config-yeoman.json` tells the generator what to build. This JSON file should save you significant time at the beginning of each project by creating most of the files and folders you need, and linking them together (like including the proper modules in the page Jade).

```javascript
{
  "project": {
    "name": "my project name"   // name your project, this shows up in the readme;
  },
  "components": {               // create an entry for each project component;
    "header": {                 // the key is the folder name for this component;
      "js": true                // if ‘js’ is true, create a JS file for this component;
    },
    "nav": {},                  // a JS file will not be generated for this component;
    "promo": {
      "js": true
    },
    "footer": {}
  },
  "templates": {                // create an entry for each template in this project;
    "home": [                   // the key is the folder name for this template;
      "header",                 // array of all the component used in this template;
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
yo short-documentation  # project files and folders are created;
```

At this point, the `config-yeoman.json` file is no longer needed, you can delete it. A new component, or a new template can be added manually.

## License

The code is available under the MIT license.
