import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  initSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  await app.listen(process.env.PORT || 3000, ()=>{
    console.log(`server running on localhost:3000`);
  });
}

function initSwagger(app: NestExpressApplication) {
  const options = new DocumentBuilder()
    .setTitle('Bin Test API')
    .setDescription('A simple RESTful web service for accessing election results in Nigeria')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}
bootstrap();
