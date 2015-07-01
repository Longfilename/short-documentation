"use strict";

var src    = "src",        // files to dev on;
    dist   = "build/dist", // where production ready files are written to;
    docs   = "build/docs", // where documentation files are written to;
    server = "localhost",  // URL of the server we're starting;
    port   = 3000;         // URL of the server we're starting;

module.exports = {
    // helper functions need these base values;
    "src": src,
    // delete documentation and the build;
    "clean": {
        "dist": dist,
        "docs": docs
    },
    // open URL (run at after everything is built, and browsersync is running);
    "open": {
        // file to trigger gulp stream;
        // we don't do anything with this file, it's just needed for a gulp stream;
        "src": src + "/pages/_short-documentation/dist/page.jade",
        // URL to open;
        "url": {
            "dist": "http://" + server + ":" + port + "/" + dist + "/index.html",
            "docs": "http://" + server + ":" + port + "/" + docs + "/index.html",
        }
    },
    // web server and synchronised browser testing;
    "browsersync": {
        // configure what gets served;
        "server": {
            "baseDir": "./",   // set the root to be the base, this way we can go to docs, and build;
            "directory": true, // enable directory browsing;
            "routes": {
                "/node_modules": "node_modules"
            }
        },
        "open": false,
        // configure the URL to access the server;
        "host": server,
        "port": port
    },
    // configure the watches for each gulp task we want to run;
    "watch": {
        "jade": [
            src + "/**/*.jade",
            src + "/**/_*.json"
        ],
        "scss": [
            src + "/**/*.scss"
        ],
        "js":   [
            src + "/**/*.js"
        ],
        "copy": [
            src + "/**/*{txt,ico}",
            src + "/fonts/*",
            src + "/**/-*.json",
            src + "/img/*",
            "!" + src + "/img/sprite/**/!(icon-sprite.png)"
        ]
    },
    // generate HTML;
    "jade": {
        "pages": {
            // these files will be compiled;
            // don't include partials (those are being included somewhere else);
            // and don't include the documentation pages;
            "compile": [
                      src + "/pages/**/*.jade",
                "!" + src + "/pages/_short-documentation/*",
                "!" + src + "/pages/**/_*.jade"
            ],
            // define the root page (usually index or default);
            // this is a generated list of all pages (for easy presentation);
            // make sure this is also set in browersync;
            "root": "index",
            // to this location (files will have a new filename);
            "dest": {
                "dist": dist + "/html",
                "docs": docs + "/html"
            }
        },
        // modules for the documentation (the build doesn't need individual modules);
        "modules": {
            // for each demo.jade, we'll create a page for the module;
            // this is the wrapper Jade for the module;
            "module": [src + "/modules/**/demo*.jade"],
            // this is the iframe page we're putting the module into;
            "iframe": [src + "/pages/_short-documentation/docs/_iframe.jade"],
            // and this is where the iframe HTML is compiled;
            "dest": docs + "/html"
        },
        "index": {
            "dist": {
                "template": src + "/pages/_short-documentation/dist/page.jade",
                "dest": dist
            },
            "docs": {
                "template": src + "/pages/_short-documentation/docs/page.jade",
                "dest": docs
            }
        }
    },
    // generate CSS for the documentation and the build;
    "scss": {
        "lint": [src + "**/*.scss"],
        "compile": [src + "/scss/*.scss", "!" + src + "/scss/_*.scss"],
        "dest": {
            "dist": dist + "/css",
            "docs": docs + "/css"
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
    // concatenate JS files for the documentation and the build;
    "js": {
        // which files to process;
        "paths": {
            "input": src + "/pages/",
            "output": {
                "dist": dist + "/js/",
                "docs": docs + "/js/"
            },
            // where generated JS is placed;
            "dest": {
                "dist": dist + "/js",
                "docs": docs + "/js"
            }
        },
        // enable file names and size reporting in the console;
        "reportFilesizes": true,
        // name the bundle that will contain common JS (shared across multiple bundles);
        // this file is created by browserify;
        "common": "common.js",
        "linstSrc": ["src/**/*.js"],
        "eslint": {
            rules: {
                "no-alert": 1,
                "no-array-constructor": 1,
                "no-bitwise": 1,
                "no-caller": 1,
                "no-catch-shadow": 1,
                "no-comma-dangle": 0,
                "no-cond-assign": 1,
                "no-console": 1,
                "no-constant-condition": 1,
                "no-continue": 0,
                "no-control-regex": 1,
                "no-debugger": 1,
                "no-delete-var": 1,
                "no-div-regex": 0,
                "no-dupe-keys": 1,
                "no-dupe-args": 1,
                "no-duplicate-case": 1,
                "no-else-return": 1,
                "no-empty": 1,
                "no-empty-class": 0,
                "no-empty-character-class": 1,
                "no-empty-label": 1,
                "no-eq-null": 0,
                "no-eval": 1,
                "no-ex-assign": 1,
                "no-extend-native": 1,
                "no-extra-bind": 1,
                "no-extra-boolean-cast": 1,
                "no-extra-parens": 0,
                "no-extra-semi": 1,
                "no-extra-strict": 1,
                "no-fallthrough": 1,
                "no-floating-decimal": 0,
                "no-func-assign": 1,
                "no-implied-eval": 1,
                "no-inline-comments": 0,
                "no-inner-declarations": 1,
                "no-invalid-regexp": 1,
                "no-irregular-whitespace": 1,
                "no-iterator": 1,
                "no-label-var": 1,
                "no-labels": 1,
                "no-lone-blocks": 1,
                "no-lonely-if": 0,
                "no-loop-func": 1,
                "no-mixed-requires": 1,
                "no-mixed-spaces-and-tabs": 1,
                "linebreak-style": 1,
                "no-multi-spaces": 1,
                "no-multi-str": 1,
                "no-multiple-empty-lines": 1,
                "no-native-reassign": 1,
                "no-negated-in-lhs": 1,
                "no-nested-ternary": 0,
                "no-new": 1,
                "no-new-func": 1,
                "no-new-object": 1,
                "no-new-require": 0,
                "no-new-wrappers": 1,
                "no-obj-calls": 1,
                "no-octal": 1,
                "no-octal-escape": 1,
                "no-param-reassign": 0,
                "no-path-concat": 0,
                "no-plusplus": 1,
                "no-process-env": 0,
                "no-process-exit": 1,
                "no-proto": 1,
                "no-redeclare": 1,
                "no-regex-spaces": 1,
                "no-reserved-keys": 0,
                "no-restricted-modules": 0,
                "no-return-assign": 1,
                "no-script-url": 1,
                "no-self-compare": 0,
                "no-sequences": 1,
                "no-shadow": 1,
                "no-shadow-restricted-names": 1,
                "no-space-before-semi": 0,
                "no-spaced-func": 1,
                "no-sparse-arrays": 1,
                "no-sync": 0,"no-ternary": 0,
                "no-trailing-spaces": [1, { "skipBlankLines": true }],
                "no-this-before-super": 0,
                "no-throw-literal": 0,
                "no-undef": 1,
                "no-undef-init": 1,
                "no-undefined": 0,
                "no-unexpected-multiline": 0,
                "no-underscore-dangle": 1,
                "no-unneeded-ternary": 0,
                "no-unreachable": 1,
                "no-unused-expressions": 0,
                "no-unused-vars": 1,
                "no-use-before-define": 1,
                "no-void": 0,
                "no-var": 0,
                "prefer-const": 1,
                "no-warning-comments": 1,
                "no-with": 1,
                "no-wrap-func": 1,
                "accessor-pairs": 0,
                "block-scoped-var": 0,
                "brace-style": 1,
                "camelcase": 1,
                "comma-dangle": 1,
                "comma-spacing": 1,
                "comma-style": 0,
                "complexity": 1,
                "computed-property-spacing": 1,
                "consistent-return": 1,
                "consistent-this": 1,
                "constructor-super": 0,
                "curly": 1,
                "default-case": 0,
                "dot-location": [1, "property"],
                "dot-notation": 1,
                "eol-last": 1,
                "eqeqeq": 1,
                "func-names": 0,
                "func-style": 0,
                "generator-star": 0,
                "generator-star-spacing": 0,
                "global-strict": 1,
                "guard-for-in": 0,
                "handle-callback-err": 0,
                "indent": 0,
                "key-spacing": 1,
                "lines-around-comment": 0,
                "max-depth": 1,
                "max-len": 0,
                "max-nested-callbacks": 0,
                "max-params": 1,
                "max-statements": 1,
                "new-cap": 1,
                "new-parens": 1,
                "newline-after-var": 1,
                "object-curly-spacing": 1,
                "object-shorthand": 0,
                "one-var": 0,
                "operator-assignment": 1,
                "operator-linebreak": 0,
                "padded-blocks": 0,
                "quote-props": 0,
                "quotes": [1, "double"],
                "radix": 0,
                "semi": 1,
                "semi-spacing": 1,
                "sort-vars": 0,
                "space-after-function-name": 1,
                "space-after-keywords": 1,
                "space-before-blocks": 1,
                "space-before-function-paren": 1,
                "space-before-function-parentheses": 1,
                "space-in-brackets": 1,
                "space-in-parens": 1,
                "space-infix-ops": 1,
                "space-return-throw-case": 1,
                "space-unary-ops": 1,
                "spaced-comment": 0,
                "spaced-line-comment": 1,
                "strict": 0,
                "use-isnan": 1,
                "valid-jsdoc": 0,
                "valid-typeof": 1,
                "vars-on-top": 1,
                "wrap-iife": 0,
                "wrap-regex": 0,
                "yoda":2
            },
            "globals": {
                "jQuery": true
            },
            "envs": {
                "browser": true, // browser global variables;
                "jquery":  true, // jquery global variables;
                "es6":     true  // enable all ECMAScript 6 features except for modules;
            },
            "ecmaFeatures": {
                "modules": true
            }
        },
        "JSHINT": {
            "settings": {
                "hint": {
                    "lookup": false,
                    "eqeqeq": true,
                    "globals": {
                        "jQuery": true
                    },
                    "nonbsp": true,
                    "undef": true,
                    "unused": true,
    
                    "esnext": true,
                    "eqnull": true,
    
                    "browser": true,
                    "browserify": true,
                    "devel": true,
                    "jquery": true
                },
                "jscs": {
                    "esnext": true,
                    "disallowSpacesInsideParentheses": true,
                    "requireCurlyBraces": [
                        "if",
                        "else",
                        "for",
                        "while",
                        "do",
                        "try",
                        "catch"
                    ],
                    "requireOperatorBeforeLineBreak": true,
                    "requireParenthesesAroundIIFE": true,
                    "requireCommaBeforeLineBreak": true,
                    "requireCamelCaseOrUpperCaseIdentifiers": true,
                    "requireDotNotation": "except_snake_case",
                    "requireSpacesInForStatement": true,
                    "requireSpaceBetweenArguments": true,
                    "maximumLineLength": {
                        "value": 255,
                        "tabSize": 4,
                        "allExcept": ["urlComments", "regex"]
                    },
                    "validateQuoteMarks": { "mark": "\"", "escape": true },
    
                    "disallowMixedSpacesAndTabs": "smart",
                    "disallowTrailingWhitespace": true,
                    "disallowMultipleLineStrings": true,
                    "disallowTrailingComma": true,
    
                    "requireSpaceBeforeBlockStatements": true,
                    "requireSpacesInFunctionExpression": {
                        "beforeOpeningCurlyBrace": true
                    },
                    "requireSpaceAfterKeywords": [
                        "if",
                        "else",
                        "for",
                        "while",
                        "do",
                        "switch",
                        "return",
                        "try",
                        "catch"
                    ],
                    "requireSpacesInsideObjectBrackets": "all",
                    "requireSpacesInsideBrackets": true,
                    "requireSemicolons": true,
                    "requireSpacesInConditionalExpression": true,
                    "requireSpaceAfterBinaryOperators": true,
                    "requireLineFeedAtFileEnd": true,
                    "requireSpaceBeforeBinaryOperators": [
                        "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=",
                        "&=", "|=", "^=", "+=",
        
                        "+", "-", "*", "/", "%", "<<", ">>", ">>>", "&",
                        "|", "^", "&&", "||", "===", "==", ">=",
                        "<=", "<", ">", "!=", "!=="
                    ],
                    "requireSpacesInAnonymousFunctionExpression": {
                        "beforeOpeningCurlyBrace": true,
                        "beforeOpeningRoundBrace": true
                    },
                    "requireSpacesInNamedFunctionExpression": {
                        "beforeOpeningRoundBrace": true,
                        "beforeOpeningCurlyBrace": true
                    },
                    "requireSpacesInFunctionDeclaration": {
                        "beforeOpeningCurlyBrace": true,
                        "beforeOpeningRoundBrace": true
                    },
                    "requirePaddingNewLinesBeforeLineComments": true,
                    "validateLineBreaks": "LF",
    
                    "disallowKeywords": [ "with" ],
                    "disallowKeywordsOnNewLine": [ "else" ],
                    "disallowSpacesInNamedFunctionExpression": {
                        "beforeOpeningRoundBrace": true
                    },
                    "disallowSpacesInAnonymousFunctionExpression": {
                        "beforeOpeningRoundBrace": true
                    },
                    "disallowSpaceAfterObjectKeys": true,
                    "disallowSpaceAfterPrefixUnaryOperators": true,
                    "disallowSpaceBeforePostfixUnaryOperators": true,
                    "disallowSpaceBeforeBinaryOperators": [ ",", ":" ],
                    "disallowMultipleLineBreaks": true
                }
            }
        }
    },
    // copy none generated files to the documentation and the build;
    "copy": {
        // copy over any remaining file types that aren't handled by the other tasks;
        // these aren't altered in anyway, it's a straight copy;
        "compile": {
            "dist": [
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
                src + "/**/*.{json,md,jade,scss,css,js}",
                // get all images;
                src + "/**/*.{gif,png,jpg,jpeg,svg,ico}",
                // except generated images;
                "!" + src + "/img/sprite/**/!(icon-sprite.png)",
                // and their source material;
                "!" + src + "/img/sprite/",
                "!" + src + "/img/sprite/*",
                // and documentation pages;
                "!" + src + "/**/demo.jade",
                // and includes (not visible through the docs anyway);
                "!" + src + "/includes/*",
                // and scss (not visible through the docs anyway);
                "!" + src + "/scss/*"
            ]
        },
        "dest": {
            "dist": dist,
            "docs": docs
        }
    }
};
