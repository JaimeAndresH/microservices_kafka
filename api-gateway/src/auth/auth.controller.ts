import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthGatewayController {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientKafka) {}

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('register_user');
    await this.authClient.connect();
  }

  @Post('register')
  async register(@Body() userData: any) {
    const response = await firstValueFrom(
      this.authClient.send('register', userData)
    );
    return response;
  }
}
