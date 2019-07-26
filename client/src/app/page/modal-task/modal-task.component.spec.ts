import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../common/services/user.service';
import { ModalTaskComponent } from './modal-task.component';
import { TaskService } from '../../common/services/task.service';
import { ModalModule } from 'ngx-bootstrap';

describe('ModalTaskComponent', () => {
  let component: ModalTaskComponent;
  let fixture: ComponentFixture<ModalTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTaskComponent ],
      imports: [ ModalModule.forRoot(), ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [ TaskService, UserService, ModalTaskComponent ]
    });
    fixture = TestBed.createComponent(ModalTaskComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    const modalTaskComponent: ModalTaskComponent = TestBed.get(ModalTaskComponent);
    expect(modalTaskComponent)
      .toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.editTaskForm.valid)
      .toBeFalsy();
  });

  it('Task name field validity', () => {
    let errors = {};
    const taskName = component.editTaskForm.controls['taskName'];
    expect(taskName.valid)
      .toBeFalsy();

    taskName.setValue('Some new task');
    errors = taskName.errors || {};
    expect(errors['required'])
      .toBeFalsy();

    taskName.setValue('Some new task');
    errors = taskName.errors || {};
    expect(errors['minLength'])
      .toBeFalsy();

    taskName.setValue('Some new task');
    errors = taskName.errors || {};
    expect(errors['maxLength'])
      .toBeFalsy();
  });

  it('form should be valid', () => {
    expect(component.editTaskForm.valid)
      .toBeFalsy();
    component.editTaskForm.controls['taskName'].setValue('Some new task');
    expect(component.editTaskForm.valid)
      .toBeTruthy();
  });

  it('form should be invalid', () => {
    component.editTaskForm.controls['taskName'].setValue('');
    expect(component.editTaskForm.valid)
      .toBeFalsy();
  });
});
