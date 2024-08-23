import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ApplicationBootstrapOptions } from './cursos/common/interfaces/application-bootstrap-options.interface';

async function bootstrap() {
  const appOptions: ApplicationBootstrapOptions = {
    driver: 'in-file', // Substitua pelo driver correto
    // Outras opções...
  };

  const appModule = AppModule.register(appOptions);
  const app = await NestFactory.create(appModule);
  await app.listen(3000);
  // const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe())
  // await app.listen(3000);
}
bootstrap();
