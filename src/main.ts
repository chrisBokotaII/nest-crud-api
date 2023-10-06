import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const { PORT = 300, API_VERSION = 'v1' } = process.env;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix(API_VERSION);
  const options = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription(
      'the blog-api is a backend where user can signin and up get a jwt access token that will enable them to perform CRUD operation . NOTE: only the owner of a post can update and delete it',
    )
    .setVersion('1.0')
    .addTag('blog-api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${API_VERSION}/doc-api`, app, document);

  await app.listen(PORT);
  Logger.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
