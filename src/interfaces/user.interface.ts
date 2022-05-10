import { AuthIdentity } from './auth.interface';

export interface User {
  id: string; //MD5 hash of the user email
  email: string;
  identities: AuthIdentity[];
}
