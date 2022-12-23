import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SerializedUser } from './types/serialized_user';
import { User } from './types/user';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      username: 'john',
      password: 'changeme',
    },
    {
      username: 'chris',
      password: 'secret',
    },
    {
      username: 'maria',
      password: 'guess',
    },
    {
      username: 'admin',
      password: 'admin',
    },
  ];

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
}
