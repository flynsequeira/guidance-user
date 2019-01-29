import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification/notification.service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [NotificationService, UserService]
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationService, private userService: UserService ) { }
  notifications = {}
  ngOnInit() {
    this.notificationService.getNotifications().subscribe((notifs)=>{
      this.notifications=notifs
    });
  }
  acceptRequest(user_id, userType, location){
    this.userService.confirmUser(user_id, userType).subscribe((res)=>{
      console.log(res);
      this.notifications['connect_reqs'][location]['accepted'] = true;
    })
  }
}

