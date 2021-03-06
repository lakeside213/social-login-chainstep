import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@/interfaces/auth.interface';

class AuthController {
  public logInCallback = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.redirect(`/auth/login-success`);
    } catch (error) {
      next(error);
    }
  };

  public loginSuccess = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.render('pages/profile.ejs');
    } catch (error) {
      next(error);
    }
  };

  public loginFailed = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.send('Login Failed');
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      req.logout();
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
