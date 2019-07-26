import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../common/services/user.service';
import { TaskService } from '../../common/services/task.service';
import { User } from '../../common/models/user';
import { TaskCreateRequestBody } from '../../common/models/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  user: User;
  searchValue: string;
  addTaskForm: FormGroup = this.fb.group({
    taskName: ['',
               [
                 Validators.required,
                 Validators.minLength(5),
                 Validators.maxLength(100),
      ]
    ],
  });

  constructor(
    private readonly userService: UserService,
    private readonly tasksService: TaskService,
    private readonly fb: FormBuilder) {
  }

  ngOnInit(): any {
    this.searchValue = '';
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  onSubmit(): void {
    const requestBody: TaskCreateRequestBody = this.getRequestBody(this.addTaskForm.value);
    this.tasksService.createTask(requestBody)
      .subscribe();
    this.searchValue = null;
  }

  private readonly getRequestBody = (formVal: any): TaskCreateRequestBody => ({
    name: formVal.taskName,
    author: this.user._id,
  });

  isFieldCorrectLength = (field: string): boolean =>
    this.isFieldTouched(field) && this.addTaskForm.get(field)
      .hasError('minlength');

  private readonly isFieldTouched = (field: string): boolean =>
    this.addTaskForm.get(field).touched || this.addTaskForm.get(field).dirty;
}
