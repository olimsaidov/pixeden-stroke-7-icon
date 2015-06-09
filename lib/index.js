/*jslint node: true, maxstatements:15, maxdepth:2, maxcomplexity:5*/
/* TODO: tests */
'use strict';
var writer = require("./writer.js");
var source = __dirname + '/../pe-icon-7-stroke/dist/pe-icon-7-stroke.css';
var output = {
  vars: 'pe-icon-7-stroke/scss/_vars-icons.scss',
  icons: 'pe-icon-7-stroke/scss/_icons.scss'
};

writer(source, { varsTo: output.vars, iconsTo: output.icons }).generate();
