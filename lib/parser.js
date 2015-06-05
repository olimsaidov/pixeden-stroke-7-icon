'use strict';
var css = require('css');
var fs = require('fs');
var _ = require('underscore');
var source = __dirname + '/../pe-icon-7-stroke/dist/pe-icon-7-stroke.css';

fs.readFile(source, 'utf-8', onReadFile);

function onReadFile(err, data) {
  if (err) {
    return console.log(err);
  }

  var obj = css.parse(data);
  var rules = obj.stylesheet.rules;

  var fonts = filterFontNodes(rules);

  var entities = _.map(fonts, handleFontNodes);
  console.log(entities);
}

function handleFontNodes (node) {
  var selectors = node.selectors;

  if (!selectors && !isArray(selectors)) {
    return;
  }

  var fontName = getFontName(selectors[0])[1];
  var contentValue = getContentValue(node.declarations);

  if (!isFontEntity(contentValue)) {
    return;
  }

  return {name: fontName, value: contentValue};

}

function filterFontNodes(nodes) {

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

function getFontName(selector) {
  return selector.match(/^(?:\.pe-7s-)(.+?)(?=:before)/);
}

function isFontNode(selector) {
  return /^(?:\.pe-7s-)(.+?)(?=:before)/.test(selector);
}

function getContentValue(declarations) {
  return _.findWhere(declarations, { property: 'content' }).value;
}

function isFontEntity (value) {
  return /\\{1,2}\w+/.test(value);
}
