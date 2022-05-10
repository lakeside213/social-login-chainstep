import passport from 'passport';
import 'dotenv/config';

import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GithubStrategy } from 'passport-github2';
import AuthService from '@/services/auth.service';
import { AuthIdentity } from '@/interfaces/auth.interface';
import UserService from '@/services/user.service';
import { User } from '@/interfaces/user.interface';

const authService = new AuthService();
const userService = new UserService();

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
      const email = profile.email;
      authService.login(email, identity);
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
      userProfileURL:
        'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
    },
    (token, tokenSecret, profile, cb) => {
      const identity: AuthIdentity = {
        id: profile.id,
        provider: profile.provider,
      };
      const email = profile.emails[0].value;
      authService.login(email, identity);
      return cb(null, profile);
    },
  ),
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      const identity: AuthIdentity = {
        id: profile.id,
        provider: profile.provider,
      };
      const email = profile.emails[0].value;
      authService.login(email, identity);
      return done(null, profile);
    },
  ),
);
