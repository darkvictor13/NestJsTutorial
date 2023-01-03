import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SerializedUser } from './types/serialized_user';
import { User } from './types/user';
import { CreateUserDto } from './dtos/create_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      username: 'chris',
      password: 'secret',
    },
    {
      id: 3,
      username: 'maria',
      password: 'guess',
    },
    {
      id: 4,
      username: 'admin',
      password: 'admin',
    },
  ];

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getUsers(): SerializedUser[] {
    return plainToInstance(SerializedUser, this.users);
  }

  getUserByUsername(username: string): SerializedUser {
    for (const user of this.users) {
      if (user.username === username) {
        return plainToInstance(SerializedUser, user);
      }
    }
    return null;
  }

  getUserById(id: number): SerializedUser {
    for (const user of this.users) {
      if (user.id === id) {
        return plainToInstance(SerializedUser, user);
      }
    }
    return null;
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return plainToInstance(SerializedUser, this.userRepository.save(newUser));
  }
}
