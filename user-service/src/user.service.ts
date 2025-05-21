import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {

  private users: User[] = [];

  addUser(user:User) {
    this.users.push(user);
  }

  getAll() {
    return this.users;
  }


}
