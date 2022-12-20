import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/CreateCustomer.dto';
import { Customer } from './types/customer';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@gmail.com',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@gmail.com',
    },
    {
      id: 3,
      name: 'John Smith',
      email: 'smith@gmail.com',
    },
  ];

  findCustomerById(id: number): Customer {
    return this.customers.find((customer) => customer.id === id);
  }

  findCustomers(): Customer[] {
    return this.customers;
  }

  createCustomer(customer: CreateCustomerDto): boolean {
    const id = this.customers.length + 1;
    const newCustomer = { id, ...customer };
    return this.customers.push(newCustomer) == id;
  }
}
