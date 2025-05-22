import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {

  private users: User[] = [];

  addUser(user: User) {
    // Validar si el usuario ya existe por ID o email
    const exists = this.users.find(u => u.id === user.id || u.email === user.email);
    if (exists) {
      throw new BadRequestException('User with the same ID or email already exists');
    }
    this.users.push(user);
  }

  getAll() {
    return this.users;
  }

  getUserById(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

}
