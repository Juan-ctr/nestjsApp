import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common'; 
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
//Example of using, in class customer.controller.ts
@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){
    async canActivate(context: ExecutionContext) {
        console.log('Inside LocalAuthGuard.canActivate');
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        console.log(`Attempting to log in user with session ID: ${request.sessionID}`);
        await super.logIn(request);
        console.log(`User logged in with session ID: ${request.sessionID}`);
        return result;
    }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate{
    async canActivate(context: ExecutionContext): Promise<any>{
        console.log('Inside LocalAuthGuard.AuthenticatedGuard');
        const req = context.switchToHttp().getRequest<Request>();
        return req.isAuthenticated();
    }
}