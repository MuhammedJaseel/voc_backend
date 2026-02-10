import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4680;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     disableErrorMessages: false,
  //     transformOptions: {
  //       enableImplicitConversion: true,
  //     },
  //   }),
  // );

  app.enableCors({ origin: '*' });

  await app.listen(PORT);
  console.log(`Running on: http://localhost:${PORT}`);
}
bootstrap();
