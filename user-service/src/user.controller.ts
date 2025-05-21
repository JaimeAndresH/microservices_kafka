import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('user_created')
  handleUsercreated(@Payload() data: any) {
    this.userService.addUser(data.value);
  }

  @MessagePattern('get_users')
  getAllUsers() {
    return this.userService.getAll();
  }

}
