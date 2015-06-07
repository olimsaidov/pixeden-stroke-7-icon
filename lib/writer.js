/*jslint node: true, maxstatements:15, maxdepth:2, maxcomplexity:5*/
'use strict';
var fs = require('fs');
var _ = require('underscore');
var parser = require("./parser.js");
var generator = require("./generator.js");
var source = __dirname + '/../pe-icon-7-stroke/dist/pe-icon-7-stroke.css';

module.exports = (function() {

  function onFileOpen(err, data) {
    if (err) {
      return console.log(err);
    }

    var obj = parser.parse(data);
    var rules = obj.stylesheet.rules;

    var fonts = parser.filterFontNodes(rules);

    var entities = _.map(fonts, parser.handleFontNodes);

    var output = generator.generateOutput(entities);

    console.log(output);

    // fs.writeFile('_vars.scss', output.vars.join('\n'), 'utf-8', onFileWrite);
  }

  function onFileWrite(err) {

  }


  return {
    generate: function() {
      fs.readFile(source, 'utf-8', onFileOpen);
    }
  };
})();
