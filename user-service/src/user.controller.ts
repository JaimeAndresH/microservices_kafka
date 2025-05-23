import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from '../../api-gateway/src/auth/dto/auth.createUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('user_created')
  handleUserCreated(@Payload() data: CreateUserDto) {
    try {
      
      if (!data) {
        console.error('Mensaje vacío recibido en user_created');
        return;
      }

      console.log(' Usuario recibido en user-service:', data);
      this.userService.addUser(data); 
    } catch (err) {
      console.error('Error al procesar user_created:', err);
      throw new Error('Error en handleUserCreated'); 
    }
}

}
