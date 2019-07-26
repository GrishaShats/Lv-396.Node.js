import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { ModalTaskComponent } from '../modal-task/modal-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, ModalModule } from 'ngx-bootstrap';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AccordionModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        ModalTaskComponent,
        TaskListComponent,
        TaskItemComponent,
        CreateTaskComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
