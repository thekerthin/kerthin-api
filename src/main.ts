import * as dotenvSafe from 'dotenv-safe';

dotenvSafe.config();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './AppModule';
import { ValidationPipe } from './shared/infra/http/pipes/ValidationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('The Kerthin')
    .setDescription('kerthin')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(process.env.PORT);
}

bootstrap();
