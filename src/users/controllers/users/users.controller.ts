import {
  ParseIntPipe,
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { SerializedUser } from '../../types';
import { UserNotFoundException } from '../../exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from '../../filters/HttpException.filter';
import { CreateUserDto } from '../../dto/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async getUsers() {
    //return await this.userService.getUsers();
    //return this.users.map((user) => new SerializedUser(user));
    const users = await this.userService.getUsers();
    if (users){
      return users.map((user) => new SerializedUser(user));
    }
    else throw new UserNotFoundException();
    

  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/username/:username')
  async getByUsername(@Param('username') username: string) {
    const users = await this.userService.getUserByUsername(username);
    if (users) {
      // return new SerializedUser(user);
      return users.map((user) => new SerializedUser(user));
    }
    else throw new UserNotFoundException();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter)
  @Get('/id/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(id);
    if (user) return new SerializedUser(user);
    else {
      throw new UserNotFoundException();
    }
  }

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
