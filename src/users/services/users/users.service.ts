import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, SerializedUser } from '../../types';
import { Repository } from 'typeorm';
import { User as UserEntity } from '../../../typeorm';
import { CreateUserDto } from '../../dto/CreateUser.dto';
import { Like } from 'typeorm';
import { encodePassword } from '../../../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // private users: User[] = [
  //   { id: 1, username: 'danny', password: 'danny' },
  //   { id: 2, username: 'adam', password: 'adam' },
  //   { id: 3, username: 'spencer', password: 'spencer' },
  //   { id: 4, username: 'derek', password: 'derek' },
  //   { id: 5, username: 'samantha', password: 'samantha' },
  // ];

  async getUsers() {
    //return this.userRepository.find();
    //return this.users.map((user) => new SerializedUser(user));
    return this.userRepository.find();
  }

  async getUserByUsername(username: string) {
    //return this.users.find((user) => user.username === username);
    return this.userRepository.find({
      where: { username: Like(`%${username}%`) },
    });
  }

  async getUserById(id: number) {
    //return this.users.find((user) => user.id === id);
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(createUserDto: CreateUserDto) {
    //Here we can check the information we are going to save in the db (duplicated data,  )
    const password = await encodePassword(createUserDto.password);
    console.log(password);

    const newUser = this.userRepository.create({...createUserDto, password });
    return this.userRepository.save(newUser);
  }

  findUniqueUserByUsername(username: string) {
    return this.userRepository.findOne({ where: {username} });
  }
}
