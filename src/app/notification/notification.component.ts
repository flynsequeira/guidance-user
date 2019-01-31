import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification/notification.service';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';
import { WebsocketService } from '../service/websocket/websocket.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [NotificationService, UserService, WebsocketService]
})
export class NotificationComponent implements OnInit {

  constructor(private webSocketService: WebsocketService, private router: Router, private notificationService: NotificationService, private userService: UserService ) {
    this.webSocketService.newFriendRequestReceived().subscribe(data => {
      this.notifications['connect_reqs'].push(data);
    });
    this.webSocketService.newChangeRequestReceived().subscribe(data => {
      this.notifications['change_reqs'].push(data);
    });
  }
  notifications = {}
  ngOnInit() {
    this.notificationService.getNotifications().subscribe((notifs)=>{
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

