const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userSchame');

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
  });
  

passport.use(
    
  new GoogleStrategy({
    clientID: '576675711373-j3guegkkksn1c7l9h68j5vpccsc46tjg.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/api/v1/auth/google/callback'
  }, (accessToken,refreshToken,profile,cb) => {
    cb(null, profile);
    console.log(profile);
    
  
  })
);

module.exports = passport;
