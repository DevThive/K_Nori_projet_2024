import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  dotenv.config();

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );

  const corsOptions = {
    origin: [
      `${process.env.FRONT_HOST}:${process.env.FRONT_PORT || 3001}`,
      process.env.FRONT_HOST,
    ],
    //origin: `${process.env.FRONT_HOST}:${process.env.FRONT_PORT || 3001}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  };

  app.enableCors(corsOptions);

  // Swagger
  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const config = new DocumentBuilder()
    .setTitle('K_NORI_API')
    .setDescription('Final API description')
    .setVersion('1.0')
    .addTag('K_NORI_API')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'accessToken',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'refreshToken',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, swaggerCustomOptions);

  // 환경 변수 설정
  const configService = app.get(ConfigService);
  const port: number = configService.get('SERVER_PORT');

  app.useStaticAssets(join(__dirname, '..', 'public')); // 정적 프론트 파일 (이번 최종 프로젝트에서는 사용할지 고민)
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.setViewEngine('ejs');

  console.log(port);

  await app.listen(port);
}
bootstrap();
