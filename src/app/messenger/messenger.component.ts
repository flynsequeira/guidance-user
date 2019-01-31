import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { MessageService } from '../service/message/message.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  constructor(private userService: UserService, private messageService: MessageService) { }

  students;

  ngOnInit() {
    this.userService.getConnectedUsers().subscribe((students)=>{
      this.students = students;
    })
  }
  chat(_id){
    // console.log(_id);
  }
}
