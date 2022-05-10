import passport from 'passport';
import 'dotenv/config';

import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
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
