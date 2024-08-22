import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { comparePassword } from '../../../utils/bcrypt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService,
    ) {}
    async validateUser(username: string, password: string) {
        const userDb = await this.userService.findUniqueUserByUsername(username);
        if (comparePassword(password, userDb.password)){
            console.log('User Validation Success!');
            return userDb;
        }
        console.log('User Validation Failed!');
        console.log(userDb.password);
        return null;
    }
}
