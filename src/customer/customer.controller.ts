import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dtos/CreateCustomer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get(':id')
  @UseGuards(AuthenticationGuard)
  getCustomer(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customerService.getCustomerById(id);
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }
    return customer;
  }

  @Get('')
  @UseGuards(AuthenticationGuard)
  getCustomers() {
    return this.customerService.getCustomers();
  }

  @Post()
  @UseGuards(AuthenticationGuard)
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomerDto);
  }
}
