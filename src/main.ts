import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

const PORT = process.env.PORT || 4680;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove extra properties automatically
      forbidNonWhitelisted: true, // Throw error if extra fields are sent
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: { enableImplicitConversion: true }, // Convert types automatically
    }),
  );

  await app.listen(PORT);
  console.log(`Running on: http://localhost:${PORT}`);
}
bootstrap();
