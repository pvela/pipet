var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs')

var indexRouter = require('./routes/index');
var transferRouter = require('./routes/transfer');
var accountRouter = require('./routes/account');
var searchRouter = require('./routes/search');

var app = express();
app.locals.moment = require('moment');

// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/views'),path.join(__dirname, 'views/pages')]);
app.set('view engine', 'pug');

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(logger('combined', { stream: accessLogStream }))

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
});
app.use('/', indexRouter);
app.use('/transfer', transferRouter);
app.use('/account', accountRouter);
app.use('/search',searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.status === 404) {
	res.render("404");
  } else {
  // render the error page
  	res.status(err.status || 500);
  	res.render('error');
  }
});

module.exports = app;
