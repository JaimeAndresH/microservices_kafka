// src/app.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { kafkaClientConfig } from './kafka/kafka.client';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        ...kafkaClientConfig,
      },
    ]),
  ],
})
export class AppModule {}
