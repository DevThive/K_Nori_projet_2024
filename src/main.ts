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
import { FontConfig } from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

const { vfs } = pdfFonts.pdfMake;

pdfMake.vfs = vfs;

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
      `${process.env.FRONT_HOST}:${process.env.FRONT_PORT || 3000}`,
      process.env.FRONT_HOST,
      'https://knori.or.kr',
      'http://localhost:3000',
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

  console.log(port);

  // 한글 폰트 파일 경로
  const fontPath = '/public/fonts';

  // pdfmake에 한글 폰트 등록
  pdfMake.fonts = {
    NotoSansKR: {
      normal: `${fontPath}/NotoSansKR-Regular.ttf`,
      bold: `${fontPath}/NotoSansKR-Bold.ttf`,
      italics: `${fontPath}/NotoSansKR-Light.ttf`,
      bolditalics: `${fontPath}/NotoSansKR-Medium.ttf`,
    },
  };
  // // 상대 경로를 절대 경로로 변환하여 폰트 파일이 위치한 디렉토리 경로 지정
  // const fontsDirectoryPath = join(__dirname, '..', 'public', 'fonts');

  // // 정적 파일 서빙 미들웨어 추가
  // app.useStaticAssets(fontsDirectoryPath, {
  //   prefix: '/fonts', // 클라이언트에서 접근할 경로 지정
  // });

  await app.listen(port);
}
bootstrap();
