const site = require('./site/site');
const docs = require('./docs/docs');

// determine if the 'server', and/or 'docs' arguements were passed;
const options = process.argv.slice(2).toString();
const startServer = options.indexOf('server') > -1;
const startDocs = options.indexOf('docs') > -1;

site.clean();
site.ts();
site.images();
site.html();
site.scss(function () {
  // wait till CSS is rendered so it can be read by the docs;
  if (startDocs) {
    docs.scss();
    docs.ts();
    docs.html();

    if (startServer) {
      docs.watch();
    }
  }
});

if (startServer) {
  site.server();
  site.watch();
}
