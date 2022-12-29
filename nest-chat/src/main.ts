import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Cors permite que recursos sejam solicitados de outro domínio
  //aplicativos que consumirão a API estão em portas diferente do aplicativo principal
  app.enableCors({
    origin: ['http://10.10.10.229:3000', //react
            'http://10.10.10.229:8080', //vuejs
            'http://10.10.10.229:4200'] //angular

  });
  //aplicativo principal será executado nessa porta
  await app.listen(8000);
}
bootstrap();
