import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Config Swagger API
  const config = new DocumentBuilder()
    .setTitle('SUPER YAJID API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const configService = app.get(ConfigService);
  const serverPort = configService.get<string>('SERVER_PORT');
  await app.listen(serverPort);
  Logger.log(`Server running on port ${serverPort}`);
}
bootstrap();
