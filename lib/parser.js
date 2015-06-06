/*jslint node: true */
'use strict';
var css = require('css');
var _ = require('underscore');

var Parser = function() {};

Parser.onReadFile = function (err, data) {
  if (err) {
    return console.log(err);
  }

  var obj = css.parse(data);
  var rules = obj.stylesheet.rules;

  var fonts = Parser.filterFontNodes(rules);

  var entities = _.map(fonts, Parser.handleFontNodes);
  console.log(entities);
};

Parser.handleFontNodes = function (node) {
  var selectors = node.selectors;

  if (!selectors && !_.isArray(selectors)) {
    return;
  }

  var fontName = Parser.getFontName(selectors[0])[1];
  var contentValue = Parser.getContentValue(node.declarations);

  if (!Parser.isFontEntity(contentValue)) {
    return;
  }

  return {name: fontName, value: contentValue};

};

Parser.filterFontNodes = function (nodes) {

  return _.filter(nodes, function(rule) {

    if (typeof rule.selectors === 'undefined') {
      return false;
    }

    var selector = rule.selectors[0];

    if (Parser.isFontNode(selector)) {
      return true;
    }

    return false;

  });
};

Parser.getFontName = function (selector) {
  return selector.match(/^(?:\.pe-7s-)(.+?)(?=:before)/);
};

Parser.isFontNode = function (selector) {
  return /^(?:\.pe-7s-)(.+?)(?=:before)/.test(selector);
};

Parser.getContentValue = function (declarations) {
  return _.findWhere(declarations, { property: 'content' }).value;
};

Parser.isFontEntity = function (value) {
  return /\\{1,2}\w+/.test(value);
};

module.exports = Parser;
