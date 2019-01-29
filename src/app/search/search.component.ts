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
    this.userService.getAllUsers().subscribe(
      (users) => {
        var current_user_id = this.userService.getValue()['_id']
        for(var i = 0 ; i< users.length; i++){
          if(users[i].requests.indexOf(String(current_user_id))>-1){
            // If requested then create requested field
            users[i]['requested']=true;
          } else {
            // If not requested... requested = false.
            users[i]['requested']=false;
          }
        }
        this.users = users
      },
      (error) => alert("Something went wrong")
    );
  }

  requestUser(user_id){
    this.userService.addUser(user_id).subscribe((added_user)=>{
      this.ngOnInit();
    })
  }

}
