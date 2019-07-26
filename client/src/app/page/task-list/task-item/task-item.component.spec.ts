import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskListComponent } from '../task-list.component';
import { TaskItemComponent } from './task-item.component';
import { ModalTaskComponent } from '../../modal-task/modal-task.component';
import { TaskService } from '../../../common/services/task.service';
import { CreateTaskComponent } from '../../create-task/create-task.component';
import { UserService } from '../../../common/services/user.service';
import { Task } from '../../../common/models/task';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let taskService: Partial<TaskService>;
  let userService: Partial<UserService>;

  const userServiceMock = jasmine.createSpyObj('UserService', {
    getAll: Observable.empty(),
    getUserType: '',
    getUserId: '',
    getUser: Observable.empty(),
    getAllHr: Observable.empty(),
  });
  userServiceMock.takeUser = Observable.empty();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AccordionModule.forRoot(),
        ModalModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
      ],
      declarations: [
        ModalTaskComponent,
        TaskListComponent,
        TaskItemComponent,
        CreateTaskComponent,
      ],
      providers: [TaskService, UserService, TaskItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = new Task();
    taskService = fixture.debugElement.injector.get(TaskService);
    userService = TestBed.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
