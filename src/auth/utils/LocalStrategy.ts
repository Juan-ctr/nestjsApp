import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(username: string, password: string){
    console.log('Inside LocalStrategy.validate');
    console.log(username);
    console.log(password);
    const user = await this.authService.validateUser(username, password);
    if(!user){
      throw new UnauthorizedException();
    }
    return user;
  }
}
