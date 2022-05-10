import { AuthIdentity } from '@/interfaces/auth.interface';

export interface CreateUserDto {
  email: string;
  authIdentity: AuthIdentity;
}

export interface LinkUserDto {
  id: string;
  authIdentity: AuthIdentity;
}
