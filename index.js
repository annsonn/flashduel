var logfmt = require("logfmt");
var gzippo = require('gzippo');
var express = require('express');
var app = express();
 
app.use(logfmt.requestLogger());
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 8080);