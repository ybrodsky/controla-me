const express 			= require('express');
const path 					= require('path');
const favicon 			= require('serve-favicon');
const logger 				= require('morgan');
const cookieParser 	= require('cookie-parser');
const bodyParser 		= require('body-parser');
const passport			= require('passport');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(require('compression')());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({secret: 'PepeArgento', maxAge: 1000 * 60 * 60 * 24}));
app.use(passport.initialize());
app.use(passport.session());
app.disable('x-powered-by');

require('./config/passport.js');

app.use(function(req, res, next) {
  req.query.all = function() {
    return require('./middlewares/query.js').parse(req.query);
  }
  return next();
});

app.use('/', index);
require('./config/routes.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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
