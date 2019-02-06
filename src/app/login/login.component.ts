import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  loginPage: boolean;

  constructor(private router: Router, private userService: UserService) { 
    this.loginPage = true;
  }

  ngOnInit() {
  }

  login(userAuth: NgForm) {
    this.userService.login(userAuth.value)
      .subscribe(
        () => {
          this.router.navigate([""]);
        },
        (error) => alert("Invalid user and password")
      );
  }

  signUp(userInfo: NgForm) {
    if(userInfo.valid){
      userInfo.value.userType = 'general';
      this.userService.register(userInfo.value)
      .subscribe(
        () => {
          // alert("Your account was successfully created!");
          setTimeout(() => { this.router.navigate([""]) }, 2000)
        },
        (error) => alert("Invalid user and password")
      );
    }
  }

}
