/*jslint node: true */
'use strict';
var fs = require('fs');
var fontParser = require("./parser.js");
var source = __dirname + '/../pe-icon-7-stroke/dist/pe-icon-7-stroke.css';

fs.readFile(source, 'utf-8', fontParser.onReadFile);
