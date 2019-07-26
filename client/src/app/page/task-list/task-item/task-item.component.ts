import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../common/models/task';
import { TaskService } from '../../../common/services/task.service';
import { UserService } from '../../../common/services/user.service';
import { User } from '../../../common/models/user';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  user: User;
  isOpen: boolean;
  isSharedFrom: boolean;
  isUserAuthor: boolean;

  constructor(private readonly userService: UserService,
              private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.userService.takeUser
      .subscribe(user => {
        this.user = user;
      });
    this.isOpen = false;
    if (this.task.sharedFrom) { this.isSharedFrom = true; }
    if (this.task.author._id === this.userService.getUserId()) { this.isUserAuthor = true; }

  }

  deleteTask(): void {
    this.taskService.deleteTask(this.task.id)
      .subscribe();
  }

  openTask(): void {
    this.isOpen = true;
  }
}
