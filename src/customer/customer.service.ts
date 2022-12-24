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
      address: {
        line1: 'a',
        zip: 'b',
        street: 'c',
        state: 'd',
      },
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      address: {
        line1: 'a',
        zip: 'b',
        street: 'c',
        state: 'd',
      },
    },
    {
      id: 3,
      name: 'John Smith',
      email: 'smith@gmail.com',
      address: {
        line1: 'a',
        zip: 'b',
        street: 'c',
        state: 'd',
      },
    },
  ];

  getCustomerById(id: number): Customer {
    return this.customers.find((customer) => customer.id === id);
  }

  getCustomers(): Customer[] {
    return this.customers;
  }

  createCustomer(customer: CreateCustomerDto): boolean {
    const id = this.customers.length + 1;
    const newCustomer = { id, ...customer };
    return this.customers.push(newCustomer) == id;
  }
}
