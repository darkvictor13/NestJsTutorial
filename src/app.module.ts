import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './config/typeorm.config';
import { CustomerModule } from './customer/customer.module';
import getPassword from './gitignorethis';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CustomerModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.0.100',
      port: 5432,
      username: 'victor',
      password: getPassword(),
      database: 'victordb',
      entities: entities,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
