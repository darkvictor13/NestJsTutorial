import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  findCustomer() {
    return 'Customer';
  }
}
