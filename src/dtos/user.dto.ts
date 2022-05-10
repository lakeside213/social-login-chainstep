import { AuthIdentity } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/user.interface';

export interface CreateUserDto {
  email: string;
  authIdentity: AuthIdentity;
}

export interface LinkUserDto {
  id: string;
  authIdentity: AuthIdentity;
}
