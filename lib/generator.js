/*jslint node: true, maxstatements:15, maxdepth:2, maxcomplexity:5*/
'use strict';
var fs = require('fs');
var _ = require('underscore');

module.exports = (function() {
  function generateVariable (font) {
    return '$font-var-' + font.name + ': ' + font.value + ';';
  }

  function generateClassName (sassVar) {
    return [
      '.#{$font-prefix}-prev:before {',
      'content: ' + sassVar,
      '}'
    ].join('\n');
  }

  function generateOutput (entities) {
    var sassVars = [];
    var sassClasses = [];

    _.each(entities, function(entity) {
      var sassVar = generateVariable(entity);
      var sassClass = generateClassName(sassVar);
      sassVars.push(sassVar); sassClasses.push(sassClass);
    });

    return { vars: sassVars, classes: sassClasses };
  }

  var generator = {
    generateOutput: generateOutput,
    _generateClassName: generateClassName,
    _generateOutput: generateOutput
  };

  return generator;

})();
