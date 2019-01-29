import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [UserService]
})
export class SearchComponent implements OnInit {
  search: null;
  users=[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((users)=>{
      console.log(users);
      this.users = users;
    });
  }

}
