import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    @Inject('LOG_SERVICE') private readonly logClient: ClientKafka,
  ) {}

  async onModuleInit() {
    console.log('Conectando logClient desde user-service...');
    await this.logClient.connect(); //  Obligatorio si usas emit()
    console.log('logClient conectado');
  }

  @EventPattern('user_created')
  handleUserCreated(@Payload() data: any) {
    if (!data) {
      throw new BadRequestException('Mensaje recibido sin datos');
    }

    this.userService.addUser(data);

    // Opcional: emitir log
    this.logClient.emit('log_created', {
      type: 'USER_CREATED',
      timestamp: new Date().toISOString(),
      payload: data,
    });
  }

  @MessagePattern('get_users')
  async getUsers() {
    try {
      return await this.userService.getAll();
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
      throw new BadRequestException('Error en getUsers');
    }
  }
}
