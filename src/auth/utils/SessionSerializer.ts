import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../typeorm';
import { UsersService } from '../../users/services/users/users.service';

export class SessionSerializer extends PassportSerializer{
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService,
    ){
        super();
    }

    serializeUser(user: User, done: (err, user: User) => void){
        console.log('Inside SessionSerializer.serializeUser');
        done(null, user);
    };

    async deserializeUser(user: User, done: (err, user: User) => void){
        console.log('Inside SessionSerializer.deserializeUser');
        const userDb = await this.userService.getUserById(user.id);
        return userDb ? done(null, userDb) : done(null, null);
    };


}