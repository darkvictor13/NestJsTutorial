import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { UserNotFoundException } from './exceptions/user_not_found.exception';
import { UserHttpExceptionFilter } from './filters/user_http_exception.filter';
import { SerializedUser } from './types/serialized_user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): SerializedUser[] {
    return this.userService.getUsers();
  }

  @Get('name/:username')
  @UseFilters(UserHttpExceptionFilter)
  getUserByUsername(@Param('username') username: string): SerializedUser {
    const user = this.userService.getUserByUsername(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Get('id/:id')
  @UseFilters(UserHttpExceptionFilter)
  getUserById(@Param('id', ParseIntPipe) id: number): SerializedUser {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
