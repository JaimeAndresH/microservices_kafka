import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/auth.user.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

  onModuleInit() {
    this.kafkaClient.connect();
  }

  async registerUser(userData: CreateUserDto) {
    await this.kafkaClient.emit('user_created', userData);
    await this.kafkaClient.emit('log_created', {
      type: 'USER_REGISTERED',
      timestamp: new Date().toISOString(),
      payload: userData,
    });
    return { message: 'User registered successfully' };
  }
}
