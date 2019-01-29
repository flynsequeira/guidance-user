import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { Config } from "../config";
import { UserService } from "../user/user.service";
import { Observable } from "rxjs";



@Injectable()
export class NotificationService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getNotifications(): Observable<Object>{
    var url = Config.apiUrl + "api/notifications";
    let opts = { headers: this.userService.getCommonHeaders(), params: new HttpParams() };
    return this.http.get(url, opts)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.userService.handleErrors)
      );
  }

}