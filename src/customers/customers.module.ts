import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../typeorm';
import { CustomersService } from './services/customers/customers.service';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { Request, Response, NextFunction } from 'express';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [
    {
      provide: 'CUSTOMER_SERVICE',
      useClass: CustomersService,
    },
  ],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //if you want to register the middleware for the entire controller, you can use the forRoutes method without specifying a method
    // consumer.apply(ValidateCustomerMiddleware).forRoutes(
    //   {
    //     path: 'customers/search/:id',
    //     method: RequestMethod.GET,
    //   },
    //   { path: 'customers/search', method: RequestMethod.GET },
    //Also you can exclude a specific route from the middleware
    consumer
      .apply(
        ValidateCustomerMiddleware,
        //Here is an example, how to call another middleware to the same routes
        ValidateCustomerAccountMiddleware,
        (req: Request, res: Response, next: NextFunction) => {
          console.log('Last middleware');
          next();
        },
      )
      // .exclude({
      //   path: 'customers/search/:id',
      //   method: RequestMethod.GET,
      // })
      .forRoutes(CustomersController);
  }
}
