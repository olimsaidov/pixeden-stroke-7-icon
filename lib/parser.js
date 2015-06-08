/*jslint node: true, maxstatements:15, maxdepth:2, maxcomplexity:5*/
'use strict';
var _ = require('underscore');
var css = require('css');

module.exports = (function() {
  
  function parse (text) {
    var nodes = css.parse(text).stylesheet.rules;
    var result = [];

    _.each(nodes, function(node) {
      var selectors = node.selectors;

      if (typeof node.selectors === 'undefined' || !_.isArray(selectors)) {
        return;
      }

      var selector = node.selectors[0];

      if (!isFontSelector(selector)) {
        return;
      }

      var fontName = getFontName(selector)[1];
      var contentValue = getContentValue(node.declarations);

      result.push({ name: fontName, value: contentValue });
    });

    return result;
  }

  function stringify (nodes) {
    var sassVars = [];
    var sassClasses = [];

    _.each(nodes, function (node) {
      var sassVar = stringifyVar(node);
      var sassClass = stringifyClass(sassVar);
      sassVars.push(sassVar); sassClasses.push(sassClass);
    });

    return { vars: sassVars, classes: sassClasses };
  }

  function getFontName (selector) {
    return selector.match(/^(?:\.pe-7s-)(.+?)(?=:before)/);
  }

  function isFontSelector (selector) {
    return /^(?:\.pe-7s-)(.+?)(?=:before)/.test(selector);
  }

  function getContentValue (declarations) {
    return _.findWhere(declarations, { property: 'content' }).value;
  }

  function stringifyVar (font) {
    return '$font-var-' + font.name + ': ' + font.value + ';';
  }

  function stringifyClass (sassVar) {
    return [
      '.#{$font-prefix}-prev:before {',
      'content: ' + sassVar,
      '}'
    ].join('\n');
  }

  return {
    parse: parse,
    stringify: stringify,
    _stringifyVar: stringifyVar,
    _stringifyClass: stringifyClass,
    _getFontName: getFontName,
    _isFontSelector: isFontSelector,
    _getContentValue: getContentValue,
  };

})();
