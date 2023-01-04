import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './config/typeorm.config';
import { CustomerModule } from './customer/customer.module';
import getPassword from './gitignorethis';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CustomerModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.0.100',
      port: 5432,
      username: 'admin',
      password: getPassword(),
      database: 'tutorialdb',
      entities: entities,
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
