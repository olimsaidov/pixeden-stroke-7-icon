/*jslint node: true, maxstatements:15, maxdepth:2, maxcomplexity:5*/
'use strict';
var fs = require('fs');
var _ = require('underscore');

var Generator = function() {};

Generator.generateVariable = function (font) {
  return '$font-var-' + font.name + ': ' + font.value + ';';
};

Generator.generateClassName = function (sassVar) {
  return [
    '.#{$font-prefix}-prev:before {',
    'content: ' + sassVar,
    '}'
  ].join('\n');
};

Generator.generateOutput = function (entities) {
  var sassVars = [];
  var sassClasses = [];

  _.each(entities, function(entity) {
    var sassVar = Generator.generateVariable(entity);
    var sassClass = Generator.generateClassName(sassVar);
    sassVars.push(sassVar); sassClasses.push(sassClass);
  });

  return { vars: sassVars, classes: sassClasses };
};

module.exports = Generator;
