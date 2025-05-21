import { ClientKafka } from '@nestjs/microservices';
import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaClientConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'auth-client',
      brokers: ['kafka:9092'],
    },
    producerOnlyMode: true,
  },
};
