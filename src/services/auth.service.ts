import { CreateUserDto, LinkUserDto } from '@/dtos/user.dto';
import { AuthIdentity } from '@/interfaces/auth.interface';
import UserService from '@services/user.service';

class AuthService {
  private userService = new UserService();

  public login(email: string, identity: AuthIdentity): void {
    const user = this.userService.findUserByEmail(email);
    if (user) {
      const linkData: LinkUserDto = {
        id: user.id,
        authIdentity: identity,
      };
      this.userService.linkIdentityToUser(linkData);
    } else {
      const createUserDto: CreateUserDto = {
        email,
        authIdentity: identity,
      };
      this.userService.createUser(createUserDto);
    }
  }
}

export default AuthService;
