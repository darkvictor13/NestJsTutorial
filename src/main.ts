import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http_exception.filter';

const SERVER_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');
  await app.listen(SERVER_PORT);
}
bootstrap();
