"use strict";

var src   = "src",
    build = "build",
    docs  = "docs";

module.exports = {
    // synchronised browser testing;
    "browsersync": {
        "server": {
            "baseDir": "./",  // set the root to be the base, this way we can go to docs, and build;
            "directory": true // enable directory browsing;
        },
        // 
        "host": "localhost",
        "port": 3000,
        "files": [
            build + "/css/*.css",
            build + "/js/*.js",
            build + "/img/*",
            build + "/fonts/*"
        ]
    },
    // delete documentation and the build;
    "clean": {
        "src": [build, docs]
    },
    // generate HTML;
    "jade": {
        // pages for the documentation and the build;
        "pages": {
            // whenever any of these files change;
            "watch":   [src + "/**/*.jade"],
            // these files will be compiled;
            // don't include partials (those are being included somewhere else);
            // and don't include the documentation pages;
            "compile": [src + "/pages/**/*.jade", "!" + src + "/pages/**/_*.jade", "!"],
            // to this location (with the same path/filename);
            "dest": {
                "build": build + "/html",
                "docs":  docs + "/html"
            },
            // the filename is treated differently if we're dealing with the page in the documentation folder;
            "documentation": "_documentation"
        },
        // modules for the documentation (the build doesn't need individual modules);
        "modules": {
            // need to know the folder to parse out;
            // yeah, it's not likely to change, but if it does, we don't have to do it in two places;
            "src": src,
            // for each demo.jade, we'll create a page for the module;
            // this is the wrapper jade for the actual module;
            "module": [src + "/modules/**/demo.jade"],
            // this is the iframe page we're putting the module into;
            "iframe": [src + "/pages/_documentation/_iframe.jade"],
            // and this is where the iframe HTML is deposited;
            "dest": docs + "/html"
        }
    },
    // generate CSS for the documentation and the build;
    "scss": {
        "compile": [src + "/scss/*.scss", "!" + src + "/scss/_*.scss"],
        "dest": {
            "build": build + "/css",
            "docs":  docs + "/css"
        },
        "maps": "./",
        // config for a plugin that fixes CSS with browser prefixes;
        "autoprefixer": {
            "browsers": [
                "last 2 versions",
                "safari 5",
                "ie 8",
                "ie 9",
                "opera 12.1",
                "ios 6",
                "android 4"
            ],
            "cascade": true
        }
    },
    "js": {
        // Enable source maps
        "debug": true,
        // Enable file names and size
        "showFiles": {
            "showFiles": true
        },
        // Additional file extensions to make optional
        "extensions": [".hbs"],
        // A separate bundle will be generated for each
        // entry in the list below.
        "input": [
            "./" + src + "/pages/home/page.js",
            "./" + src + "/pages/landing/page.js"
        ],
        // of outFiles must match the order
        // in the entries list above.
        "output": {
            "build": [
                "./" + build + "/js/page-home.js",
                "./" + build + "/js/page-landing.js"
            ],
            "docs": [
                "./" + docs + "/js/page-home.js",
                "./" + docs + "/js/page-landing.js"
            ]
        },
        "common": "common.js",
        "src": "./" + src + "/js",
        "dest": {
            "build": build + "/js",
            "docs": docs + "/js"
        }
    },
    // copy none generated files to the documentation and the build;
    // i think we need a build and a doc version;
    "copy": {
        // copy over any remaining file types that aren't handled by the other tasks;
        // these aren't altered in anyway, it's a straight copy;
        "compile": {
            "build": [
                // include any text, or icon file (in the root);
                src + "*.{txt,ico}",
                // include the fonts;
                src + "/**/*.ttf",
                // and include only the JSON files used for Ajax;
                src + "/**/-*.json",
                // get all images;
                src + "/**/*.{gif,png,jpg,jpeg,svg,ico}",
                // except generated images;
                "!" + src + "/img/sprite/**/!(icon-sprite.png)",
                // and their source material;
                "!" + src + "/img/sprite/",
                "!" + src + "/img/sprite/*"
            ],
            "docs": [
                // include any text, or icon file (in the root);
                src + "*.{txt,ico}",
                // include the fonts;
                src + "/**/*.ttf",
                // include the module and page files for display;
                // and include only the JSON files used for Ajax;
                src + "/**/-*.json",
                src + "/**/_*.json",
                src + "/**/*.md",
                src + "/**/*.jade",
                src + "/**/*.scss",
                src + "/**/*.js",
                // get all images;
                src + "/**/*.{gif,png,jpg,jpeg,svg,ico}",
                // except generated images;
                "!" + src + "/img/sprite/**/!(icon-sprite.png)",
                // and their source material;
                "!" + src + "/img/sprite/",
                "!" + src + "/img/sprite/*",
                // and documentation pages;
                "!" + src + "/**/demo.jade"
            ]
        },
        "dest": {
            "build": build,
            "docs":  docs
        }
    },
    // what files to watch once gulp is running;
    "watch": {
        "jade": [src + "/**/*.jade", src + "/**/_*.json"],
        "scss": src + "/**/*.scss",
        "js": src + "/**/*.js",
        "copy": [
            src + "/**/*{txt,ico}",
            src + "/fonts/*",
            src + "/**/-*.json",
            src + "/img/*",
            "!" + src + "/img/sprite/**/!(icon-sprite.png)"
        ]
        //"sprites": src + "/images/sprites/*"
    },
    
    
    
    sprites: {
        src: src + "/images/sprites/*.png",
        dest: {
            css: src + "/sass/",
            image: src + "/images/"
        },
        options: {
            cssName: "_sprites.scss",
            cssFormat: "css",
            cssOpts: {
                cssClass: function (item) {
                    // If this is a hover sprite, name it as a hover one (e.g. "home-hover" -> "home:hover")
                    if (item.name.indexOf("-hover") !== -1) {
                        return ".icon-" + item.name.replace("-hover", ":hover");
                        // Otherwise, use the name as the selector (e.g. "home" -> "home")
                    } else {
                        return ".icon-" + item.name;
                    }
                }
            },
            imgName: "icon-sprite.png",
            imgPath: "../images/icon-sprite.png"
        }
    },
    optimize: {
        css: {
            src: build + "/css/*.css",
            dest: build + "/css/",
            options: {
                keepSpecialComments: 0
            }
        },
        js: {
            src: build + "/js/*.js",
            dest: build + "/js/",
            options: {}
        },
        images: {
            src: [
                src + "/images/**",
                "!" + src + "/images/sprites/**/!(icon-sprite.png)"
            ],
            dest: build + "/images",
            options: {
                optimizationLevel: 3,
                progessive: true,
                interlaced: true
            }
        },
        html: {
            src: build + "/**/*.html",
            dest: build,
            options: {
                collapseWhitespace: true
            }
        }
    }
};
