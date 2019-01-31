import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user/user.service';
import { GoalService } from '../service/goal/goal.service';
import { Config } from '../service/config';


@Component({
  selector: 'user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [GoalService]
})
export class HomeComponent implements OnInit {
  panelOpenState: Boolean;
  user = null;
  goals = null;

  constructor(private router: Router, private goalService: GoalService, private userService: UserService) { }

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
      // let user_id = this.userService.getValue()['_id'];
      this.user = Config['user'];
      this.goalService.getGoals().subscribe((res)=>{
        this.goals = res;
      }, (error) => alert("Something went wrong"));
    // });
  }
  addGoal(){
    this.router.navigate(['add-goal']);
  }
  editGoal(goal_id){
    this.router.navigate(['edit-goal',goal_id]);
  }
}
