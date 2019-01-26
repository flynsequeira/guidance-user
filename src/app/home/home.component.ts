import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user/user.service';
import { GoalService } from '../service/goal/goal.service';


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
      this.goalService.getGoals(this.userService.getValue()['id']).subscribe((res)=>{
        this.user = res['user'];
        this.goals = res['goals']
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
