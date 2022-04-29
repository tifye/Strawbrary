import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(helmet());
  app.enableCors({
    origin: '*',
  });
  await app.listen(Number(process.env.WEB_APP_PORT) || 3000);
}
bootstrap();
