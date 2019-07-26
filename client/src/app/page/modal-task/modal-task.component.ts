import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Task, TaskEditRequestBody } from '../../common/models/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../common/services/user.service';
import { TaskService } from '../../common/services/task.service';
import { User } from '../../common/models/user';
@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss']
})
export class ModalTaskComponent implements OnInit {
  modalRef: BsModalRef;
  @Input() task: Task;
  @Input() modalType: string;
  users: User[];
  editTaskForm: FormGroup = this.fb.group({
    taskName: ['',
               [
                 Validators.required,
                 Validators.minLength(5),
                 Validators.maxLength(100),
      ]
    ],
  });

  constructor(
    private readonly modalService: BsModalService,
    private readonly userService: UserService,
    private readonly tasksService: TaskService,
    private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  public hideAfter(): void {
    this.modalRef.hide();
  }

  onSubmit(): void {
    const requestBody: TaskEditRequestBody = this.getRequestBody(this.editTaskForm.value);
    this.tasksService.editTask(requestBody)
      .subscribe();
  }

  getAllUsers(): any  {
    this.userService.getAll()
      .subscribe(users => this.users = users.filter((user) => user._id !== this.userService.getUserId()));
  }

  selectUser(uid: string): void {
    const requestShareBody = {
      id: this.task.id,
      sharedFrom: this.userService.getUserId(),
      sharedTo: uid,
    };
    this.tasksService.editTask(requestShareBody)
      .subscribe();
    this.hideAfter();
  }

  private readonly getRequestBody = (formVal: any): TaskEditRequestBody => ({
    id: this.task.id,
    name: formVal.taskName,
  });

  isFieldCorrectLength = (field: string): boolean =>
    this.isFieldTouched(field) && this.editTaskForm.get(field)
      .hasError('minlength');

  private readonly isFieldTouched = (field: string): boolean =>
    this.editTaskForm.get(field).touched || this.editTaskForm.get(field).dirty;

}
