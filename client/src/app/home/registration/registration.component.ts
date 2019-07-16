import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from "../../common/models/user";
import { UserService } from "../../common/services/user.service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  cities = [
    {name: 'Kyiv'},
    {name: 'Lviv'},
    {name: 'Mykolaiv'},
    {name: 'Kharkov'},
    {name: 'Vinnitsa'},
  ];
  hasFailed: boolean;
  frm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()<>./?])[a-zA-Z0-9!@#$%^&*()<>./?]+$')],
    ],
    city: ['', Validators.required],
    contact: ['', Validators.required]
  });

  constructor(
    private readonly userServise: UserService,
    private readonly route: ActivatedRoute,
    public router: Router,
    private readonly fb: FormBuilder) {
  }

  ngOnInit(): any {
    this.hasFailed = false;
  }

  onSubmit(): void {
    const requestBody: User = this.getRequestBody(this.frm.value);
    this.userServise.addUser(requestBody)
      .subscribe((data: any) => {
          this.router.navigate(['/home'], {relativeTo: this.route});
        }
      );
  }

  private readonly getRequestBody = (formVal: any): User => ({
    name: formVal.name,
    login: formVal.login,
    password: formVal.password,
    city: formVal.city,
    contact: formVal.contact,
  });


}
