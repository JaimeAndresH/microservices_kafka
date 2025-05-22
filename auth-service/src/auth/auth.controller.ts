import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/auth.user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register')
  async handleRegisterUser(@Payload() data: CreateUserDto) {
    const result = await this.authService.registerUser(data);
    return result;
  }
}
