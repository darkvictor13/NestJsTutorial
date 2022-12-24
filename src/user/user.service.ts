import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SerializedUser } from './types/serialized_user';
import { User } from './types/user';

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
}
