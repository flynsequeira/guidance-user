import { ChatAdapter } from 'ng-chat';
import { Observable } from 'rxjs';
import { UserService } from './service/user/user.service';
import {Injectable, ReflectiveInjector } from '@angular/core';
import { MessageService } from './service/message/message.service';

// var injector = ReflectiveInjector.resolveAndCreate([UserService]);
// var userService = injector.get(UserService);

 
export class MyAdapter extends ChatAdapter {
    
    // private userService: UserService;
    

    constructor(private userService: UserService, private messageService: MessageService) {
        super();
    }

    public getMessageHistory(user_id): Observable<any>{
        return this.messageService.getMessageByUser(user_id)
    }

    public listFriends(): Observable<any>{
        return this.userService.getConnectedUsers();
    }

    public sendMessage(message): void{
        this.messageService.sendMessage(message);
    }

}