import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get(':id')
  getCustomer(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customerService.findCustomerById(id);
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }
    return customer;
  }
}
