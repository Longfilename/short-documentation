System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  },
  "bundles": {
    "dist/js/all": [
      "github:components/jquery@2.1.4/jquery",
      "src/js/_library1",
      "src/js/_library2",
      "src/modules/list/ajax/module",
      "src/js/_library3",
      "src/modules/list/_common",
      "src/modules/list/templated/_logic",
      "src/pages/contact-form/page",
      "src/modules/carousel/home/module",
      "src/pages/landing/page",
      "src/pages/search-results/page",
      "github:components/jquery@2.1.4",
      "src/modules/header/module",
      "src/modules/list/templated/module",
      "src/pages/home/page",
      "src/modules/footer/module",
      "src/pages/article/page",
      "src/js/all"
    ],
    "docs/js/all": [
      "github:components/jquery@2.1.4/jquery",
      "src/js/_library1",
      "src/js/_library2",
      "src/modules/list/ajax/module",
      "src/js/_library3",
      "src/pages/contact-form/page",
      "src/modules/carousel/home/module",
      "src/pages/landing/page",
      "src/pages/search-results/page",
      "github:components/jquery@2.1.4",
      "src/modules/header/module",
      "src/modules/list/templated/module",
      "src/pages/home/page",
      "src/modules/footer/module",
      "src/pages/article/page",
      "src/js/all"
    ]
  }
});

System.config({
  "map": {
    "babel": "npm:babel-core@5.6.7",
    "babel-runtime": "npm:babel-runtime@5.6.7",
    "bootstrap-sass": "npm:bootstrap-sass@3.3.5",
    "breakpoint-sass": "npm:breakpoint-sass@2.6.1",
    "core-js": "npm:core-js@0.9.18",
    "jquery": "github:components/jquery@2.1.4",
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@5.6.7": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:breakpoint-sass@2.6.1": {
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

