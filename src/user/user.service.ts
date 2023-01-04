import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SerializedUser } from './types/serialized_user';
import { CreateUserDto } from './dtos/create_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { PasswordService } from './password/password.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  createUser(createUserDto: CreateUserDto) {
    const password = this.passwordService.hashPassword(createUserDto.password);
    console.log(password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password,
    });
    return plainToInstance(SerializedUser, this.userRepository.save(newUser));
  }
}
