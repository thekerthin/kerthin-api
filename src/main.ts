import * as dotenvSafe from 'dotenv-safe';

dotenvSafe.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
// import { ValidationPipe } from './shared/infra/http/pipes/ValidationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  // app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT);
}

bootstrap();
