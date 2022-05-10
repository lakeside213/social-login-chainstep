import express, { Application } from 'express';
import cookieSession from 'cookie-session';
import passport from 'passport';
import { Routes } from '@interfaces/routes.interface';
import * as passportConfig from '@config/passport.config';

import { renderFile } from 'ejs';
import path from 'path';
passportConfig;

class App {
  public app: Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeEjsViews();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  public getServer(): Application {
    return this.app;
  }

  private initializeEjsViews() {
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');
    this.app.engine('ejs', renderFile);
  }

  private initializeMiddlewares() {
    this.app.use(
      cookieSession({
        name: 'tuto-session',
        keys: ['key1', 'key2'],
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route: Routes) => {
      this.app.use('/', route.router);
    });
  }
}

export default App;
