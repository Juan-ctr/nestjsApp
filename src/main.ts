import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { SessionEntity } from './typeorm';
import { Repository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = app.get<Repository<SessionEntity>>(
    'SessionEntityRepository',
  );
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      name: 'Nestjs-Session',
      secret: 'alksjfdgakjsdgf89ey932hroiuqwefkjdbkfadscv32rh92yr',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      store: new TypeormStore({
        cleanupLimit: 2, // Reduce la cantidad de sesiones a limpiar
        limitSubquery: false, // Asegura que la subconsulta para verificar las sesiones no se realice
        ttl: 86400, // Tiempo de vida de la sesión
      }).connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(8000);
}
bootstrap();
