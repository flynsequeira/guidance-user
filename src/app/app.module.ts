import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatInputModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule} from '@angular/material';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { LoginComponent } from './login/login.component';
import { UserService } from './service/user/user.service';
import { AddGoalComponent } from './home/add-goal/add-goal.component';

import { NgChatModule } from 'ng-chat';
import { MessageService } from './service/message/message.service';
import { MessengerComponent } from './messenger/messenger.component';
import { ChatComponent } from './messenger/chat/chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddGoalComponent,
    MessengerComponent,
    ChatComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule,
    MatInputModule,
    SlimLoadingBarModule,
    NgChatModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [UserService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  // static userService: UserService;
  // static messageService: MessageService;
  // constructor(userService: UserService, messageService: MessageService) {
  //     AppModule.userService = userService;
  //     AppModule.messageService = messageService;
  // }
}
