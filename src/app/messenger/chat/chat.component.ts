import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'src/app/service/message/message.service';
import { Config } from '../../service/config';
import { WebsocketService } from '../../service/websocket/websocket.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [WebsocketService]
})
export class ChatComponent implements OnInit {

  constructor(private webSocketService: WebsocketService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.webSocketService.newMessageReceived().subscribe(data => {
      this.messages.push(data);
      this.isTyping = false;
    });
    this.webSocketService.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
    });
  }

  user_id;
  messages;
  message;
  me;
  isTyping;
  chatroom;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.user_id = params['user'];
      this.me = Config.user._id;
      // this.chatroom = String(this.user_id).concat(this.me);
      // testing chatroom
      this.chatroom="testing";
      // console.log('checking stuffs');
      this.messageService.getMessageByUser(this.user_id).subscribe((messages)=>{
        debugger;
        this.messages = messages
      });
      this.webSocketService.joinRoom({user: Config['user']['_id'], room: this.chatroom});
    });
  }

  sendMessage(){
    this.messageService.sendMessage(this.message).subscribe((message)=>{
      // this.messages.push(message);
      this.webSocketService.sendMessage({room: this.chatroom, user: Config['user']['_id'], message: this.message});
    })
  }
  typing() {
    this.webSocketService.typing({room: this.chatroom, user: Config['user']['_id']});
  }

}
