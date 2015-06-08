/*jslint node: true, maxstatements:15, maxdepth:2, maxcomplexity:5*/
'use strict';
var fs = require('fs');
var parser = require("./parser.js");

module.exports = (function(input, output) {

  function onFileOpen (err, text) {
    if (err) {
      return console.log(err);
    }

    var result = parser.stringify(parser.parse(text));

    fs.writeFile(output.varsTo, result.vars.join('\n'), 'utf-8', onFileWrite);
    fs.writeFile(output.classesTo, result.classes.join('\n'), 'utf-8', onFileWrite);
  }

  function onFileWrite (err) {
    if (err) {
      return console.log(err);
    }

    console.log('File saved');
  }

  return {
    generate: function() {
      return fs.readFile(input, 'utf-8', onFileOpen);
    }
  };

});
