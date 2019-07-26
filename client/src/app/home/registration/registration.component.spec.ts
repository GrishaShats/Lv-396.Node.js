import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../common/services/auth.service';
import { UserService } from '../../common/services/user.service';
import { By } from '@angular/platform-browser';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule, ReactiveFormsModule],
      providers: [AuthService, UserService, RegistrationComponent]
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
  }));

  it('should create', () => {
    const registrationComponent: RegistrationComponent = TestBed.get(RegistrationComponent);
    expect(registrationComponent)
      .toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.frm.valid)
      .toBeFalsy();
  });

  it('First name field validity', () => {
    let errors = {};
    const firstName = component.frm.controls['firstName'];
    expect(firstName.valid)
      .toBeFalsy();

    errors = firstName.errors || {};
    expect(errors['required'])
      .toBeTruthy();

    firstName.setValue('test');
    errors = firstName.errors || {};
    expect(errors['required'])
      .toBeFalsy();
  });

  it('Last name field validity', () => {
    let errors = {};
    const lastName = component.frm.controls['lastName'];
    expect(lastName.valid)
      .toBeFalsy();

    errors = lastName.errors || {};
    expect(errors['required'])
      .toBeTruthy();

    lastName.setValue('test');
    errors = lastName.errors || {};
    expect(errors['required'])
      .toBeFalsy();
  });

  it('login field validity', () => {
    let errors = {};
    const login = component.frm.controls['login'];
    expect(login.valid)
      .toBeFalsy();

    errors = login.errors || {};
    expect(errors['required'])
      .toBeTruthy();

    login.setValue('test');
    errors = login.errors || {};
    expect(errors['required'])
      .toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    const password = component.frm.controls['password'];

    errors = password.errors || {};
    expect(errors['required'])
      .toBeTruthy();

    password.setValue('weqS@123');
    errors = password.errors || {};
    expect(errors['required'])
      .toBeFalsy();

    password.setValue('weq');
    errors = password.errors || {};
    expect(errors['required'])
      .toBeFalsy();
  });

  it('form should be valid', () => {
    expect(component.frm.valid)
      .toBeFalsy();
    component.frm.controls['login'].setValue('asd');
    component.frm.controls['password'].setValue('weqS@123');
    component.frm.controls['firstName'].setValue('Grisha');
    component.frm.controls['lastName'].setValue('Shats');
    expect(component.frm.valid)
      .toBeTruthy();
  });

  it('form should be invalid', () => {
    component.frm.controls['login'].setValue('');
    component.frm.controls['password'].setValue('');
    component.frm.controls['firstName'].setValue('');
    component.frm.controls['lastName'].setValue('');
    expect(component.frm.valid)
      .toBeFalsy();
  });
});
