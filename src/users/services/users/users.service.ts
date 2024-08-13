import { Injectable } from '@nestjs/common';
import { User, SerializedUser } from '../../types';

@Injectable()
export class UsersService {
  private users: User[] = [
    { username: 'danny', password: 'danny' },
    { username: 'adam', password: 'adam' },
    { username: 'spencer', password: 'spencer' },
    { username: 'derek', password: 'derek' },
    { username: 'samantha', password: 'samantha' },
  ];

  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
