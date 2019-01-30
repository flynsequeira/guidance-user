import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification/notification.service';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [NotificationService, UserService]
})
export class NotificationComponent implements OnInit {

  constructor(private router: Router, private notificationService: NotificationService, private userService: UserService ) { }
  notifications = {}
  ngOnInit() {
    this.notificationService.getNotifications().subscribe((notifs)=>{
      console.log(notifs);
      this.notifications=notifs
    });
  }
  acceptRequest(user_id, userType, location){
    this.userService.confirmUser(user_id, userType).subscribe((res)=>{
      this.notifications['connect_reqs'][location]['accepted'] = true;
    })
  }
  acceptChange(goal_id){
    this.router.navigate(['edit-goal', goal_id]);
  }
}

