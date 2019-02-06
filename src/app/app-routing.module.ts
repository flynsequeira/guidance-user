import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { AddGoalComponent } from './home/add-goal/add-goal.component';
import { MessengerComponent } from './messenger/messenger.component';
import { ChatComponent } from './messenger/chat/chat.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'add-goal',
    component: AddGoalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-goal/:goal',
    component: AddGoalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'messenger',
    component: MessengerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:user',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
