import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from "../../common/models/user";
import { UserService } from "../../common/services/user.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
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
    this.userServise.updateUser(requestBody)
      .subscribe((data: any) => {
        this.router.navigate(['/profile'], {relativeTo: this.route});
        }
      );
  }

  private readonly getRequestBody = (formVal: any): User => ({
    _id:  this.userServise.getUserId(),
    name: formVal.name,
    login: formVal.login,
    city: formVal.city,
    contact: formVal.contact,
  });

}
