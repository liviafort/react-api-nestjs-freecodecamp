import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
    pusher: Pusher;
    //sempre fazer um construtor
    constructor(){ //depois testa com private pusher: new Pusher (não funcionou o = no this.pusher)
        this.pusher = new Pusher({
        appId: "1531109",
        key: "4d036d688b897eee34ae",
        secret: "6a2314e891c55bf80f44",
        cluster: "sa1",
        useTLS: true
    });
    }
    //função possui canal, mensagem e dados
    async trigger(channel: string, event: string, data: any){
        //atribui mesmos parametros
        await this.pusher.trigger(channel, event, data);
    }
}
