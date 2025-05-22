import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway-user-client',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'api-gateway-user-group',
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
