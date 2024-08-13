import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Body,
  Headers,
} from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';
import { CustomersService } from '../../services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get('/search')
  getCustomers() {
    const customers = this.customersService.findCustomers();
    if (customers) return customers;
    else throw new HttpException('No customers found', HttpStatus.BAD_REQUEST);
  }

  @Get('/search/:id')
  searchCustomersById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) return customer;
    else throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
  }

  @Post('create')
  createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    console.log('Create customer body: ', createCustomerDto);
    this.customersService.createCustomer(createCustomerDto);
  }
}
