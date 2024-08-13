import { Injectable } from '@nestjs/common';
import { Customer } from '../../types/Customer';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'danny@gmail.com',
      name: 'Danny',
      address: {
        line1: 'Danny street',
        line2: '',
        city: 'Danny city',
        state: 'Danny State',
      }
    },
    {
      id: 2,
      email: 'adam@gmail.com',
      name: 'Adam',
      address: {
        line1: 'Adam street',
        line2: 'Adam line2 street',
        city: 'Adam city',
        state: 'Adam State',
      }
    },
    {
      id: 3,
      email: 'spencer@gmail.com',
      name: 'Spencer',
      address: {
        line1: 'Spencer street',
        line2: '',
        city: 'Spencer city',
        state: 'Spencer State',
      }
    },
  ];

  findCustomerById(id: number) {
    return this.customers.find((customer) => customer.id === id);
  }

  findCustomers() {
    return this.customers;
  }

  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
  }
}
