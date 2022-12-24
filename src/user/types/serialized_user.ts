import { Exclude } from 'class-transformer';

export class SerializedUser {
  @Exclude()
  id: number;

  username: string;

  @Exclude()
  password: string;
}
