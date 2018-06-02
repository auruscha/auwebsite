var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const slackRouter = require('./routes/slack');
const tableRouter = require('./routes/table');

var apiRouter = require('./routes/api');
var callbackRouter = require('./routes/callback');
var wssRouter = require('./routes/wss');
var testRouter = require('./routes/test');

var indexRouter = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/slack', slackRouter);
app.use('/table', tableRouter);

app.use('/api', apiRouter);
app.use('/callback', callbackRouter);
app.use('/wss', wssRouter);
app.use('/test', testRouter);

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;