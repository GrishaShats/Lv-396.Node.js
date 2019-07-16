import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  hasFailed: boolean;
  frm: FormGroup = this.fb.group({
    login: ['', Validators.required],
    password: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()<>./?])[a-zA-Z0-9!@#$%^&*()<>./?]+$')],
    ]
  });

  constructor(
    private readonly authService: AuthService,
    public router: Router,
    private readonly fb: FormBuilder) {
  }

  ngOnInit(): any{
    this.hasFailed = false;
  }

  auth(form: any): boolean {
    this.frm.valueChanges.subscribe((value: string) => {
      if (value.length !== 0) {
        this.hasFailed = false;
      }
    });

    this.authService
      .auth(form.login, form.password)
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/profile'])
          .catch(err => throwError(new Error(err)));
        },
        (error) => {
          this.hasFailed = true;
        }
      );

    return false;
  }

}
