import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User } from '@interfaces/user.interface';
import { AuthProvider, RequestWithUser } from '@/interfaces/auth.interface';

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
      const user: User = req.user;
      res.render('pages/profile.ejs', {
        email: user.email,
        id: user.id,
      });
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

  // public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default AuthController;
