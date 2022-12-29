import { Body, Controller, Get, Post } from '@nestjs/common';
import { PusherService } from './pusher/pusher.service';

@Controller('api')
export class AppController {
  //adicione o serviço que está sendo utilizado
  constructor(private pusherService: PusherService){

  }
  @Get('messages')
  ola(){
    return "Abra o console e envie o JSON"
  }
  //solicitção de postagem para as mensagens
  @Post('messages')
  //deve sempre receber o nome de usuario e conteúdo da mensagem (que é o event no arquivo pusher.service)
  async messages(@Body('username') username: string, @Body('message') message: string){
    //usar função do serviço
    await this.pusherService.trigger('chat', message, {
      username,
      message,
    });
    console.log(message);
    return message;
  }
}
