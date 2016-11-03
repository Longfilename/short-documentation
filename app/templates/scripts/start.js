const clean = require('./clean');
const scss = require('./scss');
const ts = require('./ts');
const copy = require('./copy');
const htmlTemplates = require('./html--templates');
const htmlIndex = require('./html--index');
const docs = require('./docs/docs');
const server = require('./server');
const watch = require('./watch');

const options = process.argv.slice(2).toString();
const startServer = options.indexOf('server') > -1;
const startDocs = options.indexOf('docs') > -1;

clean();
scss();
ts();
copy('src/images', 'dist/images'); // duplicate this call for any set of static files (fonts, images, etc.);
htmlTemplates();
htmlIndex();

if (startDocs) {
  docs.scss();
  docs.ts();
  docs.html();
}

if (startServer) {
  server();
  watch(startDocs);
}
