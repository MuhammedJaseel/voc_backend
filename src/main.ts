import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import WebSocket, { WebSocketServer } from 'ws';

const connectedClients: Set<WebSocket> = new Set();

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

  const server = await app.listen(PORT);
  console.log(`Running on: http://localhost:${PORT}`);

  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    connectedClients.add(ws);
    ws.on('message', (_msg) => {});
    ws.on('close', () => connectedClients.delete(ws));
  });
}
bootstrap();

export function sendToAllSocket(payload) {
  const msg = typeof payload === 'string' ? payload : JSON.stringify(payload);
  for (const ws of connectedClients) {
    if (ws.readyState === 1) {
      // 1 === OPEN
      try {
        ws.send(msg);
        console.log('Succesfully sended to WS msg');
      } catch (err) {
        console.error('Failed to send to a client:', err);
      }
    } else {
      connectedClients.delete(ws);
    }
  }
}
