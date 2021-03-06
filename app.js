var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();

app.set('port', 8888);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'client')));

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/api/cats', routes.api.catsIndex);
app.get('/api/cats/:id', routes.api.catsShow);

app.use(routes.index);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
