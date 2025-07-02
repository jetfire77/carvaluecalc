import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// import { CookieSession } from 'cookie-session';  // this not work
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['dasdasda']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  await app.listen(3000);
}
bootstrap();
