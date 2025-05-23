import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOG_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-service-log-client',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'user-service-log-group',
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}