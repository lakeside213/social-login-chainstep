import { CreateUserDto, LinkUserDto } from '@/dtos/user.dto';
import { AuthIdentity, AuthProvider } from '@/interfaces/auth.interface';
import { User } from '@interfaces/user.interface';
import MD5 from 'crypto-js/md5';

class UserService {
  public users: User[] = [];

  public findUserByEmail(email: string): User | null {
    const id = this.hashEmail(email.trim());
    return this.findUserById(id);
  }

  public findUserById(id: string): User | null {
    const user: User = this.users.find((user) => {
      if (user.id === id) {
        return true;
      }

      return false;
    });

    return user;
  }

  public createUser(userData: CreateUserDto): User {
    const { email, authIdentity } = userData;
    const user: User = {
      id: this.hashEmail(email),
      email: email,
      identities: [authIdentity],
    };

    this.users.push(user);

    return user;
  }

  public linkIdentityToUser(linkData: LinkUserDto): void {
    const { id, authIdentity } = linkData;
    if (!this.doesIdentityExist(id, authIdentity.provider)) {
      this.users.forEach((user: User, index) => {
        if (user.id === id) {
          this.users[index] = {
            ...user,
            identities: [...user.identities, authIdentity],
          };
        }
      });
    }
  }

  private doesIdentityExist(userId: string, provider: AuthProvider): boolean {
    const user = this.findUserById(userId);
    return user.identities.some(
      (identity: AuthIdentity) => identity.provider === provider,
    );
  }

  private hashEmail(email: string): string {
    const hash = MD5(email);
    return hash.toString();
  }
}

export default UserService;
