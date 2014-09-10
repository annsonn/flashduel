var logfmt = require('logfmt'),
    path = require('path'),
    gzippo = require('gzippo'),
    express = require('express'),
    app = express();

app.use(logfmt.requestLogger());
app.use(gzippo.staticGzip(path.join(__dirname, '/dist')));
app.listen(process.env.PORT || 8080);
