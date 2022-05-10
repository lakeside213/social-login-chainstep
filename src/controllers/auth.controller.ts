import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User } from '@interfaces/user.interface';

class AuthController {
  public logInGoogleCallback = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      console.log(req, res);
      //TODO: set headers and metadata
      //   res.redirect('/auth/login-success');
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
