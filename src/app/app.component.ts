import { Component } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';
import { UserService } from './service/user/user.service';
// import { Config } from './service/config';
import { ChatAdapter } from 'ng-chat';
import { MyAdapter } from './my-adapter';
import { MessageService } from './service/message/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'guidance';
  userId;
  

  public adapter: ChatAdapter = new MyAdapter(this.userService, this.messageService);
    
  constructor(private userService: UserService, private messageService: MessageService, private _loadingBar: SlimLoadingBarService, private _router: Router) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit(){
    
    this.userService.getUserData().subscribe((user)=>{
      this.userId = this.userService.getValue()['_id'];
    });
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }
}
