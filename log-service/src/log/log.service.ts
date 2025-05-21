import { Injectable } from '@nestjs/common';

@Injectable()
export class LogService {
  handleLog(logData: any) {
    console.log('Log recibido:', logData);
  }
}
