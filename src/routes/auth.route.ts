import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import passport from 'passport';

class AuthRoute implements Routes {
  public path = '/auth/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}login-success`,
      this.authController.loginSuccess,
    );
    this.router.get(
      `${this.path}google/callback`,
      passport.authenticate('google', { scope: ['profile', 'email'] }),
      this.authController.logInGoogleCallback,
    );

    this.router.get(
      `${this.path}google`,
      passport.authenticate('google', { scope: ['profile', 'email'] }),
    );
  }
}

export default AuthRoute;