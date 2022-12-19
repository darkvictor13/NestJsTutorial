import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const SERVER_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(SERVER_PORT);
}
bootstrap();
