import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../common/services/auth.service';
import { UserService } from '../../common/services/user.service';
import { By } from '@angular/platform-browser';

import { CreateTaskComponent } from './create-task.component';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskComponent ],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule, ReactiveFormsModule],
      providers: [AuthService, UserService, CreateTaskComponent]
    });
    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  }));

  it('should create', () => {
    const createTaskComponent: CreateTaskComponent = TestBed.get(CreateTaskComponent);
    expect(createTaskComponent)
      .toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.addTaskForm.valid)
      .toBeFalsy();
  });

  it('Task name field validity', () => {
    let errors = {};
    const taskName = component.addTaskForm.controls['taskName'];
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
    expect(component.addTaskForm.valid)
      .toBeFalsy();
    component.addTaskForm.controls['taskName'].setValue('Some new task');
    expect(component.addTaskForm.valid)
      .toBeTruthy();
  });

  it('form should be invalid', () => {
    component.addTaskForm.controls['taskName'].setValue('');
    expect(component.addTaskForm.valid)
      .toBeFalsy();
  });
});
