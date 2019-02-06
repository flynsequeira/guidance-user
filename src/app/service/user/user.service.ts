import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
// import { empty } from "rxjs/observable/empty";
import { catchError, map, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
// import 'rxjs/Rx';

// const localStorage = require("application-settings");


// import { User } from "./user.model";
import { Config } from "../config";

@Injectable()
export class UserService {
  public user;
  constructor(private router: Router, private http: HttpClient) { }

  getToken(){
    return localStorage.getItem("token");
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  setValue(user: Object){
    Config['user'] = user;
  }

  removeToken() {
    this.setValue(null);
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  getCommonHeaders() {
    let header = {
      'Content-Type':  'application/json',
      'x-auth': this.getToken()
    };
    return new HttpHeaders(header);
  }

  getValue() {
    return Config.user;
  }

  // Basic use of authenticate at the backend. If token in the frontend is not real, you'll be logged out.

  getUserData(): Observable<boolean> {
    var getUrl = Config.apiUrl + "api/users/self";

    let opts = { headers: this.getCommonHeaders() };
    // let opts = { params: new HttpParams().set('token',this.getToken()) }
    return this.http.get(getUrl, opts)
           .map(res => {
              this.setValue(res['user']);
              return res['user'] ? true : false;
           })
           .catch(err => this.handleNoUser(err, this.removeToken()));
  }

  register(userInfo: any) {
    return this.http.post(
      Config.apiUrl + "api/users/register",
      userInfo,
      { headers: new HttpHeaders({'Content-Type':  'application/json'}) }
    ).pipe(
      map(response => {
        this.setToken(response['token'])
        return response
      }),
      catchError(this.handleErrors)
    );
  }

  login(user: any) {
    return this.http.post(
      Config.apiUrl + "api/users/login",
      {
        email: user.email,
        password: user.password
      }
    ).pipe(
      map(response => {
        this.setToken(response['token'])
        return response;
      }),
      catchError(this.handleErrors)
    );
  }

  addUser(user_id): Observable<Object> {
    var getUserDataUrl = Config.apiUrl + "api/users/add";
    let opts = { headers: this.getCommonHeaders(), params: new HttpParams().set('user',user_id) };
    return this.http.get(getUserDataUrl, opts)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.handleErrors)
      );
  }
  confirmUser(user_id, userType): Observable<Object> {
    var getUserDataUrl = Config.apiUrl + "api/users/confirm";
    let opts = { headers: this.getCommonHeaders(), params: new HttpParams().set('user',user_id).set('userType', userType) };
    return this.http.get(getUserDataUrl, opts)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.handleErrors)
      );
  }

  getAllUsers(): Observable<any> {
    var getUserDataUrl = Config.apiUrl + "api/users/all";
    let opts = { headers: this.getCommonHeaders(), params: new HttpParams() };
    return this.http.get(getUserDataUrl, opts)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.handleErrors)
      );
  }

  getConnectedUsers(): Observable<any> {
    var getUserDataUrl = Config.apiUrl + "api/users/connected";
    let opts = { headers: this.getCommonHeaders(), params: new HttpParams() };
    return this.http.get(getUserDataUrl, opts)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.handleErrors)
      );
  }

// Observable<Array<Object>>
  getUserById(user_id):Observable<Object> {
    var getUserDataUrl = Config.apiUrl + "api/users/by-id";
    let opts = { headers: this.getCommonHeaders(), params: new HttpParams().set('user',user_id) };
    return this.http.get(getUserDataUrl, opts)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.handleErrors)
      );
  }


  logout(){
    return this.removeToken();
  }

  handleErrors(error: Response) {
    this.router.navigate(['/login']);
    return throwError(error);
  }

  handleNoUser(error: any, cb): Promise<any> {
    // return this.router.navigate(['login']);
    this.router.navigate(['/login']);
    return Promise.reject(error.message || error);
  }
}