import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer as CustomerEntity } from '../../../typeorm';
import { Customer } from '../../types/Customer';
import { Repository, Like } from 'typeorm';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}
  // private customers: Customer[] = [
  //   {
  //     id: 1,
  //     email: 'danny@gmail.com',
  //     name: 'Danny',
  //     address: {
  //       line1: 'Danny street',
  //       line2: '',
  //       city: 'Danny city',
  //       state: 'Danny State',
  //     }
  //   },
  //   {
  //     id: 2,
  //     email: 'adam@gmail.com',
  //     name: 'Adam',
  //     address: {
  //       line1: 'Adam street',
  //       line2: 'Adam line2 street',
  //       city: 'Adam city',
  //       state: 'Adam State',
  //     }
  //   },
  //   {
  //     id: 3,
  //     email: 'spencer@gmail.com',
  //     name: 'Spencer',
  //     address: {
  //       line1: 'Spencer street',
  //       line2: '',
  //       city: 'Spencer city',
  //       state: 'Spencer State',
  //     }
  //   },
  // ];
  
  async getCustomerById(id: number) {
    //return this.customers.find((customer) => customer.id === id);
    const customer = await this.customerRepository.findOne({ where: { id } });

    try{
      const customerDto: CreateCustomerDto = {
        // id: customer.id,
        name: customer.name,
        emailAddress: customer.emailAddress,
        address: {
          line1: customer.line1,
          line2: customer.line2,
          city: customer.city,
          state: customer.state,
        },
        
      };
      return customerDto;
    }  
    catch (error){
      return null;
    }

    
    
  }

  async getCustomersByName(customerName: string) {
    //return this.customers;
    const customers = await this.customerRepository.find({
      where: { name: Like(`%${customerName}%`) },
    });

    const customersDto: CreateCustomerDto[] = customers.map((customer) => {
      return {
        // id: customer.id,
        name: customer.name,
        emailAddress: customer.emailAddress,
        address: {
          line1: customer.line1,
          line2: customer.line2,
          city: customer.city,
          state: customer.state,
        },
      };
    });

    return customersDto;
  }

  async getCustomers() {
    //return this.customers;
    const customers = await this.customerRepository.find();

    const customersDto: CreateCustomerDto[] = customers.map((customer) => {
      return {
        // id: customer.id,
        name: customer.name,
        emailAddress: customer.emailAddress,
        address: {
          line1: customer.line1,
          line2: customer.line2,
          city: customer.city,
          state: customer.state,
        },
      };
    });

    return customersDto;
  }

  createCustomer(customerDto: CreateCustomerDto) {
    //this.customers.push(customerDto);
    const { address, ...customerData } = customerDto;

    const customerToSave = {
      ...customerData,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
    };

    const newCustomer = this.customerRepository.create(customerToSave);

    return this.customerRepository.save(newCustomer);
  }
}
