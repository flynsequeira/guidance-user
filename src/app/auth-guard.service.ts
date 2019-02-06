/* Protects routes from unauthenticated users */
import { Injectable, OnInit } from '@angular/core';
import { Router,ActivatedRoute, CanActivate, CanActivateChild } from '@angular/router';
import { UserService } from './service/user/user.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  user;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) {}

  canActivate() {
    let token = this.userService.getToken();
    if (token && token.length>0){
      return this.userService.getUserData().map(isAuth => {
        this.user = this.userService.getValue();
        if(this.user && this.user['userType']=='general'){
          return true;
        }
        else{
          this.userService.removeToken();
          return false;
        }
      });
    }
    else {
      this.userService.removeToken();
      return false;
    }
  }

  canActivateChild() {
    if (this.userService.getToken()) {
      return true;
    }
    else {
      this.userService.removeToken();
      return false;
    }
  }
}
