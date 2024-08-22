import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Hello, i am inside ValidateCustomerMiddleware');
    //An example of a middleware that checks if the request has an authorization header
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(403).send({ error:'No Authentication Token Provided' });
    }
    if (authorization === '123'){
        next();
    }else{
        return res.status(403).send({ error:'Invalid Authorization Token Provided.'})
    }
  }
}
