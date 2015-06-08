/*jslint node: true, maxstatements:15, maxdepth:2, maxcomplexity:5*/
'use strict';
var writer = require("./writer.js");
var source = __dirname + '/../pe-icon-7-stroke/dist/pe-icon-7-stroke.css';
var css = require('css');

writer(source, { varsTo: '_vars.scss', classesTo: '_classes.scss' }).generate();
