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

  var fonts = filterFontClasses(rules);

  console.log(fonts);
}

function filterFontClasses(rules) {

  return _.filter(rules, function(rule) {
    var declarations = rule.declarations;
    var content = _.findWhere(declarations, { property: 'content' });

    if (typeof content !== 'undefined' && /\\{1,2}\w+/.test(content.value)) {
      return true;
    }

    return false;

  });
}
