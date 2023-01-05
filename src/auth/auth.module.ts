import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from 'src/user/password/password.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from '../session/session.serializer';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthService',
      useClass: AuthService,
    },
    {
      provide: 'UserService',
      useClass: UserService,
    },
    LocalStrategy,
    PasswordService,
    SessionSerializer,
  ],
})
export class AuthModule {}
