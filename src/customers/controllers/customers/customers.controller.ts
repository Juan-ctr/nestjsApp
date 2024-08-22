import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Body,
  Inject,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';
import { AuthenticatedGuard } from '../../../auth/utils/LocalGuard';
import { CustomersService } from '../../services/customers/customers.service';
import { CustomerNotFoundException } from '../../exceptions/CustomerNotFound.exception';

@Controller('customers')
export class CustomersController {
  constructor(
    @Inject('CUSTOMER_SERVICE') private readonly customersService: CustomersService,
  ) {}
 
  @UseGuards(AuthenticatedGuard)
  @Get('')
  async getCustomers() {
    const customers = await this.customersService.getCustomers();
    if (customers) return customers;
    else throw new CustomerNotFoundException();
  }

  @Get('/id/:id')
  async getCustomersById(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customersService.getCustomerById(id);
    if (customer) return customer;
    else throw new CustomerNotFoundException();
  }

  @Get('/name/:name')
  async getCustomersByName(@Param('name') name: string) {
    const customers = await this.customersService.getCustomersByName(name);
    if (customers) return customers;
    else throw new CustomerNotFoundException
  }

  @Post('create')
  createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    //console.log('Create customer body: ', createCustomerDto);
    return this.customersService.createCustomer(createCustomerDto);
  }
}
