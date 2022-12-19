import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  private customers = [
    {
      id: 1,
      name: 'John Doe',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Jane Doe',
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'John Smith',
      createdAt: new Date(),
    },
  ];
  findCustomerById(id: number) {
    return this.customers.find((customer) => customer.id === id);
  }
}
