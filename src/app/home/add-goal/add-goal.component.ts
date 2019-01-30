import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../service/goal/goal.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.scss'],
  providers: [GoalService]
})
export class AddGoalComponent implements OnInit {
  goal: object = {};
  user_id: String;
  constructor(private router: Router, private goalService: GoalService, private route: ActivatedRoute) { }

  ngOnInit() { 
    this.route.params.subscribe((params: Params) => {
      this.user_id = params['id']
      if(params['goal']){
        debugger;
        this.goalService.getGoal(params['goal']).subscribe((res)=>{
          this.goal = res;
        }, (error) => alert("Something went wrong"));
      } else {
        this.goal['name'] = null;
        this.goal['description'] = null;
        this.goal['milestones']=[];
      }
    });
    
  }

  addMilestone(){
    this.goal['milestones'].push({
      milestone: null
    });
  }
  removeMilestone(i){
    this.goal['milestones'].splice(i,1);
  }
  saveGoal(){
    this.goalService.saveGoal(this.goal).subscribe((res)=>{
      this.router.navigate(['']);
    }, (error) => alert("Something went wrong"));
  }
  approveChange(){
    this.goalService.approveChange(this.goal['_id']).subscribe((res)=>{
      this.router.navigate(['']);
    }, (error) => alert("Something went wrong"));
  }
  rejectChange(){
    this.goalService.rejectChange(this.goal['_id']).subscribe((res)=>{
      this.router.navigate(['']);
    }, (error) => alert("Something went wrong"));
  }
}