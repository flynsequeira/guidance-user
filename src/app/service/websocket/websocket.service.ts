
import { UserService } from '../user/user.service';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebsocketService {

  // private socket = new Socket('http://localhost:3000');
  constructor(private socket: Socket) { }


  storeId(user_id) {
    this.socket.emit('socketId', String(user_id));
  }

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    const observable = new Observable<{ user: String, message: String}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  newFriendRequestReceived() {
    const observable = new Observable<{ _id: String, firstName: String, lastName: String, userType: String}>(observer => {
      this.socket.on('new friend', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  newChangeRequestReceived() {
    const observable = new Observable<{ user: String, message: String}>(observer => {
      this.socket.on('new change', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data) {
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}