import { HttpException, HttpStatus } from '@nestjs/common';

//This is a way to handle your own exceptions
export class UserNotFoundException extends HttpException {
    constructor(msg?: string, status?: HttpStatus) {
        super(msg || 'User/s not found', status || HttpStatus.BAD_REQUEST);
    }
}