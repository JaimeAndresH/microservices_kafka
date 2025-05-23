import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(@Inject('USER_SERVICE') private readonly userService: ClientKafka) {}

  async onModuleInit() {
    this.userService.subscribeToResponseOf('get_users');
    await this.userService.connect();
  }

  @Get()
  async getUsers() {
    try {
      const response = await firstValueFrom(this.userService.send('get_users', {}));
      return response;
    } catch (error) {
      console.error('Error al obtener usuarios desde el user-service:', error);
      throw new Error('Error al comunicarse con el user-service');
    }
  }
}
