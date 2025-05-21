import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { LogService } from './log.service';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @EventPattern('log_created')
  handleLogEvent(@Payload() data: any) {
    this.logService.handleLog(data.value);
  }
}
