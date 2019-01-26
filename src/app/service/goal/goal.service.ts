import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Config } from "../config";
import { UserService } from "../user/user.service";

@Injectable()
export class GoalService {
// , private userService: UserService ... a silly error that I couldn't waste time on at the moment
  constructor(private http: HttpClient, private userService: UserService) { }


  // Observable<Array<Object>>
  getGoals():Observable<Object> {
    var getUserDataUrl = Config.apiUrl + "api/goals/all";
    let opts = { headers: this.userService.getCommonHeaders() };
    return this.http.get(getUserDataUrl, opts)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.userService.handleErrors)
      );
  }

  // Observable<Array<Object>>
  getGoal(goal_id):Observable<Object> {
    var getUserDataUrl = Config.apiUrl + "api/goals";
    let opts = { headers: this.userService.getCommonHeaders(), params: new HttpParams().set('goal',goal_id) };
    return this.http.get(getUserDataUrl, opts)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.userService.handleErrors)
      );
  }

  saveGoal(goal): Observable<Object>{
    var url = Config.apiUrl + "api/goals/save";
    let opts = { headers: this.userService.getCommonHeaders() };
    return this.http.post(url, goal, opts)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.userService.handleErrors)
      );
  }
}
