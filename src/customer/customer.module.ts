import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { ValidateCustomerMiddleware } from './middlewares/validate_customer.middleware';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate_customer_account.middleware';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateCustomerMiddleware, ValidateCustomerAccountMiddleware)
      .forRoutes(CustomerController);
  }
}
