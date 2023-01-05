import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http_exception.filter';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { SessionEntity } from './session/session.entity';

const SERVER_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = app.get(DataSource).getRepository(SessionEntity);
  //const sessionRepository = getRepository(SessionEntity);

  app.setGlobalPrefix('api');
  //app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    session({
      secret: 'this is a secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        // 1 week
        //maxAge: 1000 * 60 * 60 * 24 * 7,
        // 1 minute
        maxAge: 1000 * 60,
      },
      store: new TypeormStore({
        cleanupLimit: 5,
      }).connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(SERVER_PORT);
}
bootstrap();
