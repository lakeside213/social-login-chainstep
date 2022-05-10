import { Request } from 'express';
import { User } from '@interfaces/user.interface';

export interface AuthIdentity {
  id: string;
  provider: AuthProvider;
}

export enum AuthProvider {
  GOOGLE = 'google',
  GITHUB = 'github',
  TWITTER = 'twitter',
}

export interface RequestWithUser extends Request {
  user: User;
}
