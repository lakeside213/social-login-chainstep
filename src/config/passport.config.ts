import passport from 'passport';
import 'dotenv/config';

import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import AuthService from '@/services/auth.service';
import { AuthIdentity } from '@/interfaces/auth.interface';

const authService = new AuthService();

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
      const identity: AuthIdentity = {
        id: profile.id,
        provider: profile.provider,
      };
      authService.login(profile.email, identity);
      done(null, profile);
    },
  ),
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/twitter/callback',
    },
    (token, tokenSecret, profile, cb) => {
      console.log(profile);
      process.nextTick(function () {
        console.log(profile);
        return cb(null, profile);
      });
    },
  ),
);
