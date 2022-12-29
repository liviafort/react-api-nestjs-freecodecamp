import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PusherService } from './pusher/pusher.service';

//tudo que foi usado na aplicação deve estar aqui
@Module({
  imports: [],
  controllers: [AppController],
  providers: [PusherService],
})
export class AppModule {}
