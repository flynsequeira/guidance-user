import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { Config } from "../config";
import { UserService } from "../user/user.service";
import { Socket } from 'ngx-socket-io';


@Injectable()
export class MessageService {

  constructor(private http: HttpClient, private userService: UserService) { }
  messaging_user: String;

  getMessageByUser(user_id: any){
    this.messaging_user = String(user_id);
    var url = Config.apiUrl + "api/messages";
    let opts = { headers: this.userService.getCommonHeaders(), params: new HttpParams().set('user',user_id) };
    return this.http.get(url, opts)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.userService.handleErrors)
      );
  }

  sendMessage(message: String){
    var url = Config.apiUrl + "api/messages/send";
    let opts = { headers: this.userService.getCommonHeaders() };
    var msg = {
      user: this.messaging_user,
      message: message
    }
    console.log(msg);
    return this.http.post(url,msg, opts)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.userService.handleErrors)
      );
  }
}
