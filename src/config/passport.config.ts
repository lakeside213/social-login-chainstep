import passport from 'passport';
import 'dotenv/config';

import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

passport.serializeUser((req, user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      //   console.log(profile, accessToken, refreshToken, 'passport-log-1');
      done(null, profile);
    },
  ),
);
