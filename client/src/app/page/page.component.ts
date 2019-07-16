import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../common/services/user.service';
import { User } from '../common/models/user';
import { throwError, Subject } from 'rxjs';
import { AuthService } from "../common/services/auth.service";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly userService: UserService,
              private readonly authService: AuthService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) { }

  user: User;
  id: any;

  ngOnInit(): void {
    this.checkIdParam();
  }

  confirm(): void {
    this.userService.deleteUser(this.user._id)
      .subscribe(() =>
        this.router.navigate(['/home'], {relativeTo: this.route}));
    this.logout()
  }

  private readonly checkIdParam = () => {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadUser(this.id);
  };

  private readonly loadUser = (id: string) => {
    this.userService.getUser(id, true)
      .subscribe(user => this.user = user);
  };

  logout(): boolean {
    this.authService.logout();
    this.router.navigate(['/home'])
      .catch(err => throwError(new Error(err)));

    return false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
