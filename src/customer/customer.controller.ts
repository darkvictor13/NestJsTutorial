import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  getCustomer() {
    this.customerService.findCustomer();
  }
}
