import { Controller, Post, Body, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/auth.createUser.dto';


@Controller('auth')
export class AuthGatewayController implements OnModuleInit {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientKafka) {}

  async onModuleInit() {
    // Suscribirse al tema de respuesta
    this.authService.subscribeToResponseOf('register');
    await this.authService.connect();
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const response = await firstValueFrom(
      this.authService.send('register', body),
    );
    return response;
  }
}