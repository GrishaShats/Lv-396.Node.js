import { Component, OnInit } from '@angular/core';
import { Task } from '../common/models/task';
import { TaskService } from '../common/services/task.service';
import { UserService } from '../common/services/user.service';
import { throwError } from 'rxjs';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  tasks: Task[];

  constructor(
    private readonly userService: UserService,
    private readonly taskService: TaskService,
    private readonly authService: AuthService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.getTasks();
    this.loadTasks(this.userService.getUserId());
  }

  getTasks(): void {
    this.taskService.takeUserTasks
      .subscribe(tasks => this.tasks = tasks);

  }

  loadTasks(userID): void {
    this.taskService.getUserTasks(userID)
      .subscribe();
  }

  logout(): boolean {
    this.authService.logout();
    this.router.navigate(['/home'])
      .catch(err => throwError(new Error(err)));

    return false;
  }
}
