import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dtos/create_user.dto';
import { UserNotFoundException } from './exceptions/user_not_found.exception';
import { UserHttpExceptionFilter } from './filters/user_http_exception.filter';
import { SerializedUser } from './types/serialized_user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return plainToInstance(SerializedUser, await this.userService.getUsers());
  }

  @Get('name/:username')
  @UseFilters(UserHttpExceptionFilter)
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<SerializedUser> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return plainToInstance(SerializedUser, user);
  }

  @Get('id/:id')
  @UseFilters(UserHttpExceptionFilter)
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SerializedUser> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return plainToInstance(SerializedUser, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
