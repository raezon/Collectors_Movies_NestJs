import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('collector application')
    .setDescription(
      `This api is related to the mangement of a small store of collector type movie or serie ,the api include severall operation like many features
      - Authentication modules that has a signUp and signIn methods.
      - Favorite module to manage favorite collector .
      - Collector module to get collector by type,search a collector by name,get top five collector or movies best noted.

      Plus you will find a summary operation for each method,example of body or query.
      `,
    )
    .setVersion('1.0')
    .addTag('collectors')
    .addBearerAuth(
      {
        type: 'http',
        schema: 'Bearer',
        bearerFormat: 'Token',
      } as SecuritySchemeObject,
      'Bearer',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  });
  await app.listen(3000);
}
bootstrap();
