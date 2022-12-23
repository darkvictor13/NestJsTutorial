import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { SerializedUser } from './types/serialized_user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): SerializedUser[] {
    return this.userService.getUsers();
  }

  @Get(':username')
  getUserByUsername(@Param('username') username: string): SerializedUser {
    const user = this.userService.getUserByUsername(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
