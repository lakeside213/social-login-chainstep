import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User } from '@interfaces/user.interface';
import { AuthProvider } from '@/interfaces/auth.interface';

class AuthController {
  public logInGoogleCallback = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      console.log('redirect');
      res.redirect(`/auth/login-success?provider=${AuthProvider.GOOGLE}`);
    } catch (error) {
      next(error);
    }
  };

  public loginSuccess = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const loginProvider: AuthProvider = req.query.provider as AuthProvider;

      res.render('pages/profile.ejs', {
        name: 'test',
        pic: 'test',
        email: 'test',
        profile: loginProvider,
      });
    } catch (error) {
      console.log(error);
      //   next(error);
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
