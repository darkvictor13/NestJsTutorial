import { Exclude } from 'class-transformer';

export class SerializedUser {
  username: string;

  @Exclude()
  password: string;
}
