const fs = require('fs'); // write to the file system;
const colors = require('colors'); // pretty console output;
const express = require('express'); // run a web server;
const server = express(); // start the server;
const port = 8080;
const distPath = 'dist/';

module.exports = () => {
  server.use(express.static('dist')); // serve the static files from the dist folder;

  server.listen(port);

  console.log('web server has started @ ' + ('http://localhost:' + port).green);
};
