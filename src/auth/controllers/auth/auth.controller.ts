import {
  Controller,
  Post,
  UseGuards,
  Get,
  Session,
  Req
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard, AuthenticatedGuard } from '../../utils/LocalGuard';


@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {}

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    session.authenticated = true;
    return session; 
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus() {
  }
}
