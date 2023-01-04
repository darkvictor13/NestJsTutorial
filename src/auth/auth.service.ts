import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SerializedUser } from 'src/user/types/serialized_user';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserService') private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (user && user.password === password) {
      return plainToInstance(SerializedUser, user);
    }
    return null;
  }
}
