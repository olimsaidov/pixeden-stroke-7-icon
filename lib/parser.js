/*jslint node: true, maxstatements:15, maxdepth:2, maxcomplexity:5*/
'use strict';
var _ = require('underscore');
var css = require('css');

module.exports = (function() {

  function handleFontNodes (node) {
    var selectors = node.selectors;

    if (!selectors && !_.isArray(selectors)) {
      return;
    }

    var fontName = getFontName(selectors[0])[1];
    var contentValue = getContentValue(node.declarations);

    if (!isFontEntity(contentValue)) {
      return;
    }

    return {name: fontName, value: contentValue};

  }

  function filterFontNodes (nodes) {

    return _.filter(nodes, function(rule) {

      if (typeof rule.selectors === 'undefined') {
        return false;
      }

      var selector = rule.selectors[0];

      if (isFontNode(selector)) {
        return true;
      }

      return false;

    });
  }

  function parse (data) {
    return css.parse(data);
  }

  function getFontName (selector) {
    return selector.match(/^(?:\.pe-7s-)(.+?)(?=:before)/);
  }

  function isFontNode (selector) {
    return /^(?:\.pe-7s-)(.+?)(?=:before)/.test(selector);
  }

  function getContentValue (declarations) {
    return _.findWhere(declarations, { property: 'content' }).value;
  }

  function isFontEntity (value) {
    return /\\{1,2}\w+/.test(value);
  }

  var parser = {
    parse: parse,
    filterFontNodes: filterFontNodes,
    handleFontNodes: handleFontNodes,
    _getFontName: getFontName,
    _isFontNode: isFontNode,
    _getContentValue: getContentValue,
    _isFontEntity: isFontEntity
  };

  return parser;

})();
