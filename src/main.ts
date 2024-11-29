import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UnauthorizedInterceptor } from './comum/interceptors/unauthorized.interceptor';
import { NotFoundInterceptor } from './comum/interceptors/not-found.interceptor';
import { BadRequestInterceptor } from './comum/interceptors/bad-request.interceptor';
import { DataBaseInterceptor } from './comum/interceptors/data-base.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(
    new UnauthorizedInterceptor(),
    new NotFoundInterceptor(),
    new BadRequestInterceptor(),
    new DataBaseInterceptor(),
  );

  const configSwagger = new DocumentBuilder()
    .setTitle('Kanguru')
    .setDescription('Kanguru API Backend Software')
    .setVersion('0.1')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
