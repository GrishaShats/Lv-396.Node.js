import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../common/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: Task[];

  ngOnInit(): void {
  }

  trackElement(index: number, task: Task): string {
    return task.id;
  }

}
