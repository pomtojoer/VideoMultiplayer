var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const publicRouter = require("./routes/public");
const aboutRouter = require("./routes/about");
const supportRouter = require("./routes/support");
const reactionGameMultiplayerRouter = require("./routes/games/reactionGameMultiplayer");
const handPongMultiplayerRouter = require("./routes/games/handPongMultiplayer");
const reactionGameSinglePlayerRouter = require("./routes/games/reactionGameSinglePlayer");
const handPongSinglePlayerRouter = require("./routes/games/handPongSinglePlayer");

var app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'),path.join(__dirname, 'views/gameViews')]);
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', publicRouter);
app.use('/about', aboutRouter);
app.use('/support', supportRouter);
app.use('/reactionGameMultiplayer/:id', reactionGameMultiplayerRouter);
app.use('/handPongMultiplayer/:id', handPongMultiplayerRouter);
app.use('/reactionGame', reactionGameSinglePlayerRouter);
app.use('/handPong', handPongSinglePlayerRouter);

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
