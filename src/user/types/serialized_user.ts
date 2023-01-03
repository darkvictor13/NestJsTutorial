import { Exclude } from 'class-transformer';

export class SerializedUser {
  id: number;

  username: string;

  @Exclude()
  password: string;
}
