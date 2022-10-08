import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:'http://localhost:3000',
    credentials:true
  })

  app.use(cookieParser());
  // app.use(
  //   session({
  //     secret: '7348d8683',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3333);
}
bootstrap();
