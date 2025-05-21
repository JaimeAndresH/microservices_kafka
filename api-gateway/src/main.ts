// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Middleware para listar rutas disponibles
  const server = app.getHttpAdapter();
  const logger = new Logger('Routes');
  server.getInstance()._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      logger.log(`Ruta registrada: ${middleware.route.path}`);
    }
  });

  await app.listen(3000);
  console.log('API Gateway corriendo en http://localhost:3000');
}
bootstrap();
