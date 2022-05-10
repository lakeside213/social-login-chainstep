import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.render('pages/index');
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
