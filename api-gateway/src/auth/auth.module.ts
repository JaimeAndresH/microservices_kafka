import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGatewayController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway-auth-client',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'api-gateway-auth-group',
          },
        },
      },
    ])
    
  ],
  controllers: [AuthGatewayController],
})
export class AuthModule {}
