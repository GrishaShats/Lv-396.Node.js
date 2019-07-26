import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../common/services/auth.service';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(
    () => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
        imports: [HttpClientTestingModule, FormsModule, RouterTestingModule, ReactiveFormsModule],
        providers: [AuthService, HomeComponent]
      });
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
  });

  it('should be created', () => {
    const homeComponent: HomeComponent = TestBed.get(HomeComponent);
    expect(homeComponent)
      .toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.frm.valid)
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

    password.setValue('weqS@123');
    errors = password.errors || {};
    expect(errors['required'])
      .toBeFalsy();

    password.setValue('weq');
    errors = password.errors || {};
    expect(errors['required'])
      .toBeFalsy();

    password.setValue('weqS@123');
    errors = password.errors || {};
    expect(errors['minLength'])
      .toBeFalsy();

    password.setValue('weq');
    errors = password.errors || {};
    expect(errors['minLength'])
      .toBeFalsy();
  });

  it('form should be valid', () => {
    expect(component.frm.valid)
      .toBeFalsy();
    component.frm.controls['login'].setValue('asd');
    component.frm.controls['password'].setValue('weqS@123');
    expect(component.frm.valid)
      .toBeTruthy();
  });

  it('form should be invalid', () => {
    component.frm.controls['login'].setValue('');
    component.frm.controls['password'].setValue('');
    expect(component.frm.valid)
      .toBeFalsy();
  });

  it('should not call the auth method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'auth');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.auth)
      .toHaveBeenCalledTimes(0);
  }));

  it('should call the auth method', async(() => {
    component.frm.controls['login'].setValue('asd');
    component.frm.controls['password'].setValue('weqS@123');
    fixture.detectChanges();
    spyOn(component, 'auth');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.auth)
      .toHaveBeenCalledTimes(1);
  }));
});
