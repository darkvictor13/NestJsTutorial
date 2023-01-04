import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
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
  ],
})
export class AuthModule {}
