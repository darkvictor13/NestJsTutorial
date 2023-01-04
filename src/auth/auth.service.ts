import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PasswordService } from 'src/user/password/password.service';
import { SerializedUser } from 'src/user/types/serialized_user';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserService') private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      return null;
    }
    const isPasswordValid = this.passwordService.comparePassword(
      password,
      user.password,
    );
    return isPasswordValid ? plainToInstance(SerializedUser, user) : null;
  }
}
