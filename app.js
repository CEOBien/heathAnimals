var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
var session = require('express-session')
var FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, (err) => {
  if(err) console.log(err) 
  else console.log("mongdb is connected");
 });





var accountRouter = require('./routes/account');
var infoRouter = require('./routes/info');
var infoUserRouter = require('./routes/infoUser');
var slideRouter = require('./routes/slider');
var menuRouter = require('./routes/menu');
var rankRouter = require('./routes/rank');
var bookingRouter = require('./routes/booking');
var experienceRouter = require('./routes/experience');
var feedbackRouter = require('./routes/feedback');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', accountRouter);
app.use('/info',infoRouter);
app.use('/infouser',infoUserRouter);
app.use('/slider',slideRouter);
app.use('/menu',menuRouter);
app.use('/rank',rankRouter);
app.use('/booking',bookingRouter);
app.use('/experience',experienceRouter);
app.use('/feedback',feedbackRouter);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      user
      // id: user.id,
      // username: user.username,
      // picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
function(accessToken, refreshToken, profile, cb) {
  return cb(null,profile);
  // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //   return cb(err, user);
  // });
}
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

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
