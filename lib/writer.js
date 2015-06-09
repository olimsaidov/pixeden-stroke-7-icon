/*jslint node: true, maxstatements:15, maxdepth:2, maxcomplexity:5*/
'use strict';
var fs = require('fs');
var parser = require("./parser.js");

/**
 * Self-executing anonymous function that takes path to the source css file as
 * the first parameter (string) and pathes to automaticaly generated sass files
 * as the second one.
 */
module.exports = (function(input, output) {

  function onFileOpen (err, text) {
    if (err) {
      return console.log(err);
    }

    var result = parser.stringify(parser.parse(text));

    fs.writeFile(output.varsTo, result.vars.join('\n'), 'utf-8', onFileWrite);
    fs.writeFile(output.iconsTo, result.classes.join('\n'), 'utf-8', onFileWrite);
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
